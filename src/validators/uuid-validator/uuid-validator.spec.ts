import { Test, TestingModule } from '@nestjs/testing';
import { UuidValidator } from './uuid-validator';

describe('UuidValidator', () => {
  let provider: UuidValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidValidator],
    }).compile();

    provider = module.get<UuidValidator>(UuidValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
