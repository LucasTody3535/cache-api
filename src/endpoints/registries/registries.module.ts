import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { RegistriesController } from './registries.controller';
import { UuidValidator } from '../../validators/uuid-validator/uuid-validator';
import { ResponseService } from '../../utils/response/response.service';
import { EncryptionService } from '../../utils/encryption/encryption.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [RegistriesController],
  providers: [
    RegistriesService,
    UuidValidator,
    ResponseService,
    EncryptionService,
  ],
})
export class RegistriesModule {}
