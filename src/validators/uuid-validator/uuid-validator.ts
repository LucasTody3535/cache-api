import { Injectable } from '@nestjs/common';
import { validate, version } from 'uuid';

@Injectable()
export class UuidValidator {
  isUuidv4(uuid: string) {
    return validate(uuid) && version(uuid) === 4;
  }
}
