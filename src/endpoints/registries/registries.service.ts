import { Inject, Injectable } from '@nestjs/common';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UuidValidator } from 'src/validators/uuid-validator/uuid-validator';

@Injectable()
export class RegistriesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private uuidValidator: UuidValidator
  ) {}

  save(registry: UpdateRegistryDto) {
    this.uuidValidator.isUuidv4(registry.key);
    this.cacheService.set(registry.key, registry.data, {
      // 3600000ml = 1h
      ttl: new Blob([registry.data]).size * 3600000
    });
  }

  async obtainWith(key: string) {
    this.uuidValidator.isUuidv4(key);
    return await this.cacheService.get(key);
  }
}
