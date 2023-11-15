import { Test, TestingModule } from '@nestjs/testing';
import { RegistriesController } from './registries.controller';
import { RegistriesService } from './registries.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { TokenErrorFilter } from '../../filters/token-error/token-error.filter';
import { ResponseService } from '../../utils/response/response.service';
import { EncryptionService } from '../../utils/encryption/encryption.service';

describe('RegistriesController', () => {
  let controller: RegistriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), ThrottlerModule.forRoot([
        {
          ttl: 60000,
          limit: 10,
        },
      ])],
      controllers: [RegistriesController],
      providers: [RegistriesService, EncryptionService, ResponseService, TokenErrorFilter],
    }).compile();

    controller = module.get<RegistriesController>(RegistriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
