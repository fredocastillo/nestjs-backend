import { DynamicModule, Global, Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, HeaderResolver, I18nJsonLoader } from 'nestjs-i18n';
import { MessageService } from './services/message.service';
import { ENUM_MESSAGE_LANGUAGE } from './enums/message.enum';

@Global()
@Module({})
export class MessageModule {
  static forRoot(): DynamicModule {
    return {
      module: MessageModule,
      imports: [
        I18nModule.forRootAsync({
          loader: I18nJsonLoader,
          inject: [],
          resolvers: [new HeaderResolver(['x-custom-lang'])],
          useFactory: () => ({
            fallbackLanguage: 'EN',
            fallbacks: Object.values(ENUM_MESSAGE_LANGUAGE).reduce(
              (a, v) => ({ ...a, [`${v}-*`]: v }),
              {}
            ),
            loaderOptions: {
              path: path.join(__dirname, '../../languages'),
              watch: true,
            },
          }),
        }),
      ],
      providers: [MessageService],
      exports: [MessageService],
    };
  }
}
