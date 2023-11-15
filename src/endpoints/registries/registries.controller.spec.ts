import { Test, TestingModule } from '@nestjs/testing';
import { RegistriesController } from './registries.controller';
import { RegistriesService } from './registries.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

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
      providers: [RegistriesService],
    }).compile();

    controller = module.get<RegistriesController>(RegistriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
