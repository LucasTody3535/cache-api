import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService, ResponseGeneratorUtil, EncryptionService],
})
export class TokensModule {}
