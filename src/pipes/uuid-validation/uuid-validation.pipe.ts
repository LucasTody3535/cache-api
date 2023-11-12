import { Injectable, PipeTransform } from '@nestjs/common';
import { UuidError } from 'src/models/errors/internal/uuid-error/uuid-error';
import { validate, version } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(uuid: string, _: never) {
    if(validate(uuid) && version(uuid) === 4) return uuid;
    throw new UuidError();
  }
}
