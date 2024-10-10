import { HttpStatus } from '@nestjs/common';
import { IMessageOptionsProperties } from '../../message/interfaces/message.interface';
import { ENUM_HELPER_FILE_EXCEL_TYPE } from '../../helper/enums/helper.enum';
import { IFileRows } from '../../file/interfaces/file.interface';

export interface IResponseCustomProperty {
  statusCode?: number;
  message?: string;
  httpStatus?: HttpStatus;
  messageProperties?: IMessageOptionsProperties;
}

// metadata
export interface IResponseMetadata {
  customProperty?: IResponseCustomProperty;
  [key: string]: any;
}

// decorator options
export interface IResponseOptions {
  messageProperties?: IMessageOptionsProperties;
  cached?: IResponseCacheOptions | boolean;
}

export interface IResponseFileExcelOptions {
  type?: ENUM_HELPER_FILE_EXCEL_TYPE;
}

// response
export interface IResponse<T = void> {
  _metadata?: IResponseMetadata;
  data?: T;
}

// response pagination
export interface IResponsePagingPagination {
  totalPage: number;
  total: number;
}

export interface IResponsePaging<T> {
  _metadata?: IResponseMetadata;
  _pagination: IResponsePagingPagination;
  data: T[];
}

export interface IResponseFileExcel {
  data: IFileRows[];
}

// cached
export interface IResponseCacheOptions {
  key?: string;
  ttl?: number;
}
