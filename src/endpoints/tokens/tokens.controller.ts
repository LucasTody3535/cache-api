import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { Response } from 'src/models/response/response';

@Controller('tokens')
export class TokensController {
  constructor(
    private readonly tokensService: TokensService,
    private readonly responseGeneratorUtil: ResponseGeneratorUtil
  ) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  getToken(): Response<string> {
    return this.responseGeneratorUtil
        .genGenericResponse(
          HttpStatus.CREATED,
          ResponseMessages.TOKEN_CREATED,
          this.tokensService.generateUniqueToken()
        ) as Response<string>;
  }
}
