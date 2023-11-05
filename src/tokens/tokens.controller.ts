import { Controller, Get } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  getToken(): string {
    return this.tokensService.generateUniqueToken();
  }
}
