import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { RESPONSE_FILE_EXCEL_TYPE_META_KEY, RESPONSE_MESSAGE_PATH_META_KEY, RESPONSE_MESSAGE_PROPERTIES_META_KEY } from '../constants/response.constant';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { ResponseFileExcelInterceptor } from '../interceptors/response.file.interceptor';
import { ResponsePagingInterceptor } from '../interceptors/response.paging.interceptor';
import { IResponseOptions, IResponseFileExcelOptions } from '../interfaces/response.interface';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ENUM_HELPER_FILE_EXCEL_TYPE } from '@backend/helper';

export function Response(messagePath: string, options?: IResponseOptions): MethodDecorator {
  const decorators: any = [
    UseInterceptors(ResponseInterceptor),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(
      RESPONSE_MESSAGE_PROPERTIES_META_KEY,
      options?.messageProperties
    ),
  ];

  if (options?.cached) {

    decorators.push(UseInterceptors(CacheInterceptor));

    if (typeof options?.cached !== 'boolean') {
      if (options?.cached?.key) {
        decorators.push(CacheKey(options?.cached?.key));
      }

      if (options?.cached?.ttl) {
        decorators.push(CacheTTL(options?.cached?.ttl));
      }
    }
  }

  return applyDecorators(...decorators);
}

export function ResponsePaging(messagePath: string, options?: IResponseOptions): MethodDecorator {
  const decorators: any = [
    UseInterceptors(ResponsePagingInterceptor),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(RESPONSE_MESSAGE_PROPERTIES_META_KEY, options?.messageProperties),
  ];

  if (options?.cached) {
    
    decorators.push(UseInterceptors(CacheInterceptor));

    if (typeof options?.cached !== 'boolean') {
      if (options?.cached?.key) {
        decorators.push(CacheKey(options?.cached?.key));
      }

      if (options?.cached?.ttl) {
        decorators.push(CacheTTL(options?.cached?.ttl));
      }
    }
  }

  return applyDecorators(...decorators);
}

export function ResponseFileExcel(options?: IResponseFileExcelOptions): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseFileExcelInterceptor),
    SetMetadata(RESPONSE_FILE_EXCEL_TYPE_META_KEY, options?.type ?? ENUM_HELPER_FILE_EXCEL_TYPE.CSV)
  );
}
