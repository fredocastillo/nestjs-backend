import { DynamicModule, Global, Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';

@Global()
@Module({})
export class PaginationModule {
  static forRoot(): DynamicModule {
    return {
      module: PaginationModule,
      imports: [],
      providers: [PaginationService],
      exports: [PaginationService],
    };
  }
}
