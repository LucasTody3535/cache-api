import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DataError } from 'src/models/errors/internal/data-error/data-error';

@Injectable()
export class RegistryDataValidationPipe implements PipeTransform {
  async transform(registry: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, registry);
    const errors = await validate(object);
    if (errors.length > 0) throw new DataError();
    return registry;
  }
}
