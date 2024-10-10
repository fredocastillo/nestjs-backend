import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterDateOptions } from '../interfaces/pagination.interface';
import { IRequestApp } from '../../request/interfaces/request.interface';
import { PaginationService } from '../services/pagination.service';
import { HelperDateService } from '../../helper/services/helper.date.service';
import { ENUM_PAGINATION_FILTER_DATE_TIME_OPTIONS } from '../enums/pagination.enum';

export function PaginationFilterDatePipe(field: string,options?: IPaginationFilterDateOptions): Type<PipeTransform> {

    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterDatePipe implements PipeTransform {
      
      constructor(@Inject(REQUEST) protected readonly request: IRequestApp, private readonly paginationService: PaginationService, private readonly helperDateService: HelperDateService) {}

      async transform(value: string): Promise<Record<string, Date | string> | null> {

        if (!value) {
          return null;
        }

        if (options?.raw) {
          this.addToRequestInstance(value);
          return {
            [field]: value,
          };
        }

        let finalValue: Date = this.helperDateService.create(value);

        if (options?.time === ENUM_PAGINATION_FILTER_DATE_TIME_OPTIONS.END_OF_DAY) {
          finalValue = this.helperDateService.endOfDay(finalValue);
        } else if (options?.time === ENUM_PAGINATION_FILTER_DATE_TIME_OPTIONS.START_OF_DAY) {
          finalValue = this.helperDateService.startOfDay(finalValue);
        }

        this.addToRequestInstance(value);
        return this.paginationService.filterDate(field, finalValue);
      }

      addToRequestInstance(value: any): void {
        this.request.__pagination = {
          ...this.request.__pagination,
          filters: this.request.__pagination?.filters ? { ...this.request.__pagination?.filters, [field]: value } : { [field]: value },
        };
      }
    }

    return mixin(MixinPaginationFilterDatePipe);
}
