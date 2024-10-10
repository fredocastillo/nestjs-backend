import { HttpStatus } from '@nestjs/common';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../../request/enums/request.status-code.enum';
import { IMessageValidationImportErrorParam } from '../../message/interfaces/message.interface';

export class FileImportException extends Error {
  readonly httpStatus: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  readonly statusCode: number = ENUM_REQUEST_STATUS_CODE_ERROR.VALIDATION;
  readonly errors: IMessageValidationImportErrorParam[];

  constructor(errors: IMessageValidationImportErrorParam[]) {
    super('file.error.validationDto');
    this.errors = errors;
  }
}
