import { Injectable, PipeTransform } from '@nestjs/common';
import { DataError } from 'src/models/errors/internal/data-error/data-error';

@Injectable()
export class DataValidationPipe implements PipeTransform {
  private validDataTypes = ["string", "object", "number"]

  transform(value: any, _: never) {
    if(
      this.validDataTypes.includes(typeof value) &&
      !isNaN(value) &&
      value !== null
    ) return value;
    throw new DataError();
  }
}
