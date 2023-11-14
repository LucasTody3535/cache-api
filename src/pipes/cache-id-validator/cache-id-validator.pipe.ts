import { Injectable, PipeTransform } from '@nestjs/common';
import { CacheIdError } from 'src/models/errors/internal/cache-id-error/cache-id-error';

@Injectable()
export class CacheIdValidatorPipe implements PipeTransform {
  transform(value: any, _: never) {
    if(typeof value !== "string" || value.length < 1) throw new CacheIdError();
    return value;
  }
}
