import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegistryDataStructureError } from 'src/models/errors/internal/registry-data-structure-error/registry-data-structure-error';

@Injectable()
export class RegistryDataStructureValidationPipe implements PipeTransform {
  async transform(registry: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, registry);
    const errors = await validate(object);
    if (errors.length > 0) throw new RegistryDataStructureError();
    return registry;
  }
}
