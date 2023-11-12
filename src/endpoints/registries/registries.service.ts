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

  save(registry: UpdateRegistryDto, key: string) {
    if(!this.uuidValidator.isUuidv4(key)) throw new Error("Invalid v4 UUID!");
    this.cacheService.set(key, registry.data, {
      // 3600000ml = 1h
      ttl: new Blob([registry.data]).size * 3600000
    });
  }

  obtainWith(key: string) {
    if(!this.uuidValidator.isUuidv4(key)) throw new Error("Invalid v4 UUID!");
    return this.cacheService.get(key);
  }
}
