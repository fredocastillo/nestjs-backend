import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterOptions } from '../interfaces/pagination.interface';
import { IRequestApp } from '../../request/interfaces/request.interface';
import { PaginationService } from '../services/pagination.service';
import { HelperArrayService } from '../../helper/services/helper.array.service';

export function PaginationFilterNinEnumPipe<T>(field: string, defaultValue: T, defaultEnum: Record<string, any>, options?: IPaginationFilterOptions): Type<PipeTransform> {

  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterInEnumPipe implements PipeTransform {

    constructor(@Inject(REQUEST) protected readonly request: IRequestApp, private readonly paginationService: PaginationService, private readonly helperArrayService: HelperArrayService) {}

    async transform(value: string): Promise<Record<string, any>> {
      if (options?.raw) {
        this.addToRequestInstance(value);
        return {
          [field]: value,
        };
      }

      const finalValue: T[] = value ? this.helperArrayService.getIntersection<T>(value.split(',') as T[], Object.values(defaultEnum) as T[]) : (defaultValue as T[]);

      return this.paginationService.filterNin<T>(field, finalValue);
    }

    addToRequestInstance(value: any): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: this.request.__pagination?.filters ? { ...this.request.__pagination?.filters, [field]: value } : { [field]: value },
      };
    }
  }

  return mixin(MixinPaginationFilterInEnumPipe);
}
