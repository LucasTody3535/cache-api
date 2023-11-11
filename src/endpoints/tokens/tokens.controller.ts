import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { Response } from 'src/models/response/response';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Controller('tokens')
export class TokensController {
  constructor(
    private readonly tokensService: TokensService,
    private readonly responseGeneratorUtil: ResponseGeneratorUtil,
    private readonly encryptionService: EncryptionService
  ) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  getToken(): Response<string> {
    this.encryptionService.setup();
    return this.responseGeneratorUtil
        .genGenericResponse(
          HttpStatus.CREATED,
          ResponseMessages.TOKEN_CREATED,
          this.encryptionService.encrypt(this.tokensService.generateUniqueToken())
        ) as Response<string>;
  }
}
