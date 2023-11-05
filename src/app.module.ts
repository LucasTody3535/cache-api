import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TokensModule } from './tokens/tokens.module';
import { RegistriesModule } from './registries/registries.module';
import * as redisStore from 'cache-manager-redis-store';
import { ResponseGeneratorUtil } from './utils/response-generator/response-generator.util';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }), TokensModule, RegistriesModule],
  controllers: [],
  providers: [ResponseGeneratorUtil],
})
export class AppModule {}
