import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from "../enums/pagination.enum";
import { IPaginationOrder } from "./pagination.interface";

export interface IPaginationService {
  offset(page: number, perPage: number): number;
  totalPage(totalData: number, perPage: number): number;
  page(page?: number): number;
  perPage(perPage?: number): number;
  order(orderByValue: string, orderDirectionValue: ENUM_PAGINATION_ORDER_DIRECTION_TYPE, availableOrderBy: string[]): IPaginationOrder;
  search(searchValue: string, availableSearch: string[]): Record<string, any> | null;
  filterEqual<T = string>(field: string, filterValue: T): Record<string, T>;
  filterNotEqual<T = string>(field: string, filterValue: T): Record<string, T>;
  filterContain(field: string, filterValue: string): Record<string, any>;
  filterContainFullMatch(field: string, filterValue: string): Record<string, any>;
  filterIn<T = string>(field: string, filterValue: T[]): Record<string, any>;
  filterNin<T = string>(field: string, filterValue: T[]): Record<string, any>;
  filterDate(field: string, filterValue: Date): Record<string, Date>;
}
