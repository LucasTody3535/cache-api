import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { RegistriesController } from './registries.controller';
import { UuidValidator } from 'src/validators/uuid-validator/uuid-validator';
import { ResponseService } from 'src/utils/response/response.service';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Module({
  controllers: [RegistriesController],
  providers: [RegistriesService, UuidValidator, ResponseService, EncryptionService],
})
export class RegistriesModule {}
