import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { RegistriesController } from './registries.controller';
import { UuidValidator } from 'src/validators/uuid-validator/uuid-validator';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';

@Module({
  controllers: [RegistriesController],
  providers: [RegistriesService, UuidValidator, ResponseGeneratorUtil],
})
export class RegistriesModule {}
