import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { EncryptionService } from '../../utils/encryption/encryption.service';
import { ResponseService } from '../../utils/response/response.service';


describe('TokensController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [TokensService, ResponseService, EncryptionService],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
