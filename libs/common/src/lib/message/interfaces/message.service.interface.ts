import { ValidationError } from '@nestjs/common';
import { IMessageErrorOptions, IMessageSetOptions, IMessageValidationError, IMessageValidationImportError, IMessageValidationImportErrorParam } from '../interfaces/message.interface';
import { ENUM_MESSAGE_LANGUAGE } from '../enums/message.enum';

export interface IMessageService {
  getAvailableLanguages(): ENUM_MESSAGE_LANGUAGE[];
  getLanguage(): ENUM_MESSAGE_LANGUAGE;
  filterLanguage(customLanguage: string): string[];
  setMessage(path: string, options?: IMessageSetOptions): string;
  setValidationMessage(errors: ValidationError[], options?: IMessageErrorOptions): IMessageValidationError[];
  setValidationImportMessage( errors: IMessageValidationImportErrorParam[], options?: IMessageErrorOptions): IMessageValidationImportError[];
}
