import { Inject, Injectable } from '@nestjs/common';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RegistriesService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  save(registry: UpdateRegistryDto, key: string) {
    this.cacheService.set(key, registry.data, {
      // 3600000ml = 1h
      ttl: new Blob([registry.data]).size * 3600000
    });
  }

  obtainWith(key: string) {
    return this.cacheService.get(key);
  }
}
