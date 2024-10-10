import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterOptions } from '../interfaces/pagination.interface';
import { IRequestApp } from '../../request/interfaces/request.interface';
import { PaginationService } from '../services/pagination.service';


export function PaginationFilterStringContainPipe(field: string, options?: IPaginationFilterOptions): Type<PipeTransform> {

  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterContainPipe implements PipeTransform {

    constructor(@Inject(REQUEST) protected readonly request: IRequestApp, private readonly paginationService: PaginationService) {}

    async transform(value: string): Promise<Record<string, any> | null> {
      if (!value) {
        return null;
      }

      if (options?.raw) {
        this.addToRequestInstance(value);
        return {
          [field]: value,
        };
      }

      value = value.trim();

      this.addToRequestInstance(value);
      return this.paginationService.filterContain(field, value);
    }

    addToRequestInstance(value: any): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: this.request.__pagination?.filters ? { ...this.request.__pagination?.filters, [field]: value } : { [field]: value },
      };
    }
  }

  return mixin(MixinPaginationFilterContainPipe);
}
