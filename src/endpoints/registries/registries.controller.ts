import { Body, Controller, Get, HttpStatus, Param, Post, UseFilters, UsePipes } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { TokenErrorFilter } from 'src/filters/token-error/token-error.filter';
import { Headers } from 'src/decorators/decorators';
import { TokenDecryptionPipe } from 'src/pipes/token-decryption/token-decryption.pipe';

@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private responseGeneratorUtil: ResponseGeneratorUtil,
    private readonly encryptionService: EncryptionService
  ) {}

  @Post()
  @UseFilters(TokenErrorFilter)
  updateRegistry(@Body() registry: UpdateRegistryDto, @Headers("Authorization", TokenDecryptionPipe) key: string) {
    this.registriesService.save(registry, key);
    return this.responseGeneratorUtil
      .genGenericResponse(
        HttpStatus.CREATED,
        ResponseMessages.DATA_SAVED,
        null
      );
  }

  @Get()
  @UseFilters(TokenErrorFilter)
  async getRegistry(@Headers("Authorization") key: string) {
    this.encryptionService.setup();
    const payload = await this.registriesService.obtainWith(this.encryptionService.decrypt(key));
    return this.responseGeneratorUtil
      .genGenericResponse(
        HttpStatus.FOUND,
        ResponseMessages.DATA_RETRIEVED,
        payload
      );
  }
}
