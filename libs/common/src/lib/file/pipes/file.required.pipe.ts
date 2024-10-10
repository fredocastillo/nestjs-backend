import { PipeTransform, Injectable, UnprocessableEntityException} from '@nestjs/common';
import { ENUM_FILE_STATUS_CODE_ERROR } from '../enums/file.status-code.enum';
import { IFile } from '../interfaces/file.interface';

@Injectable()
export class FileRequiredPipe implements PipeTransform {

  constructor(readonly field?: string) {}

  async transform(value: IFile | IFile[]): Promise<IFile | IFile[]> {
    let fieldValue = value;
    if (this.field) {
      fieldValue = (value as any)[this.field];
    }

    await this.validate(fieldValue);

    return value;
  }

  async validate(value: IFile | IFile[]): Promise<void> {
    if (!value || (Array.isArray(value) && value.length === 0) || Object.keys(value).length === 0) {
      throw new UnprocessableEntityException({
        statusCode: ENUM_FILE_STATUS_CODE_ERROR.REQUIRED,
        message: 'file.error.required',
      });
    }

    return;
  }
}
