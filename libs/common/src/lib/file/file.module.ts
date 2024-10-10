import { DynamicModule, Global, Module } from '@nestjs/common';
import { FileService } from './services/file.service';

@Global()
@Module({})
export class FileModule {
  static forRoot(): DynamicModule {
    return {
      module: FileModule,
      imports: [],
      providers: [FileService],
      exports: [FileService],
    };
  }
}
