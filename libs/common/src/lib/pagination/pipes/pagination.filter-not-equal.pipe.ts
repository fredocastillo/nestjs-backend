import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterEqualOptions } from '../interfaces/pagination.interface';
import { IRequestApp } from '../../request/interfaces/request.interface';
import { PaginationService } from '../services/pagination.service';

export function PaginationFilterNotEqualPipe(field: string, options?: IPaginationFilterEqualOptions): Type<PipeTransform> {

  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterEqualPipe implements PipeTransform {

    constructor(@Inject(REQUEST) protected readonly request: IRequestApp, private readonly paginationService: PaginationService) {}

    async transform(value: string): Promise<Record<string, string | number> | null> {
      if (!value) {
        return null;
      }

      if (options?.raw) {
        this.addToRequestInstance(value);
        return {
          [field]: value,
        };
      }

      const finalValue: string | number = options?.isNumber ? Number.parseInt(value) : value.trim();

      this.addToRequestInstance(finalValue);
      return this.paginationService.filterNotEqual(field, finalValue);
    }

    addToRequestInstance(value: any): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: this.request.__pagination?.filters ? { ...this.request.__pagination?.filters, [field]: value } : { [field]: value },
      };
    }
  }

  return mixin(MixinPaginationFilterEqualPipe);
}
