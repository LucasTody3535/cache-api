import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TokensModule } from './tokens/tokens.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }), TokensModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
