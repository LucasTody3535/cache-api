import { Inject, Injectable } from '@nestjs/common';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RegistriesService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  save(registry: UpdateRegistryDto, uuid: string) {
    this.cacheService.set(`${uuid}_${registry.cacheId}`, registry.data, {
      // 3600000ml = 1h
      // 12960000000ml = 24h
      ttl: 12960000000,
    });
  }

  obtainWith(uuid: string, cacheId: string) {
    return this.cacheService.get(`${uuid}_${cacheId}`);
  }
}
