import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ResponseService } from 'src/utils/response/response.service';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { Response } from 'src/models/response/response';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tokens')
export class TokensController {
  constructor(
    private readonly tokensService: TokensService,
    private readonly responseService: ResponseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @ApiOperation({
    summary: 'Used to obtain an encrypted cache key, used for cache operations',
  })
  @ApiResponse({
    status: 201,
    description: 'The token was created succesfully',
  })
  @ApiCreatedResponse({
    description: 'The cache key was created and returned',
    schema: {
      example: new Response(
        HttpStatus.CREATED,
        ResponseMessages.TOKEN_CREATED,
        '3039a6f03f265d49509917f3e6caa68d',
      ),
    },
  })
  @Get()
  @HttpCode(HttpStatus.CREATED)
  getToken(): Response<string> {
    this.encryptionService.setup();
    return this.responseService.genGenericResponse(
      HttpStatus.CREATED,
      ResponseMessages.TOKEN_CREATED,
      this.encryptionService.encrypt(this.tokensService.generateUniqueToken()),
    ) as Response<string>;
  }
}
