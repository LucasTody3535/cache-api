import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateRegistryDto } from 'src/endpoints/registries/dto/update-registry.dto';
import { RegistryDataSizeError } from 'src/models/errors/internal/registry-data-size-error/registry-data-size-error';

@Injectable()
export class RegistryDataSizeValidatorPipe implements PipeTransform {
  constructor(private readonly maxSizeInBytes: number) {}

  transform(registry: UpdateRegistryDto, _: never) {
    const registryBlob = new Blob([registry.data]);
    if (registryBlob.size > this.maxSizeInBytes)
      throw new RegistryDataSizeError();
    return registry;
  }
}
