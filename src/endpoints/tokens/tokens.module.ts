import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { ResponseService } from '../../utils/response/response.service';
import { EncryptionService } from '../../utils/encryption/encryption.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService, ResponseService, EncryptionService],
})
export class TokensModule {}
