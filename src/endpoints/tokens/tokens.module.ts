import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';

@Module({
  controllers: [TokensController],
  providers: [TokensService, ResponseGeneratorUtil],
})
export class TokensModule {}
