import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { RegistriesController } from './registries.controller';

@Module({
  controllers: [RegistriesController],
  providers: [RegistriesService],
})
export class RegistriesModule {}
