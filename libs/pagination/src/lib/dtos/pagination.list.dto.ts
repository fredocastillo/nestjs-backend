import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../enums/pagination.enum';
import { IPaginationOrder } from '../interfaces/pagination.interface';

export class PaginationListDto {
  @ApiHideProperty()
  _search: Record<string, any> | undefined;

  @ApiHideProperty()
  _limit: number | undefined;

  @ApiHideProperty()
  _offset: number | undefined;

  @ApiHideProperty()
  _order: IPaginationOrder | undefined;

  @ApiHideProperty()
  _availableOrderBy: string[] | undefined;

  @ApiHideProperty()
  _availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[] | undefined;

  @IsOptional()
  @ApiHideProperty()
  perPage?: number;

  @IsOptional()
  @ApiHideProperty()
  page?: number;

  @IsOptional()
  @ApiHideProperty()
  orderBy?: string;

  @IsOptional()
  @ApiHideProperty()
  orderDirection?: ENUM_PAGINATION_ORDER_DIRECTION_TYPE;
}
