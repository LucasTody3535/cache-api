import { Body, Controller, Get, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { Response } from 'src/models/response/response';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { InvalidUuidFilter } from 'src/exceptions-filters/invalid-uuid/invalid-uuid.filter';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { TokenErrorFilter } from 'src/filters/token-error/token-error.filter';

@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private responseGeneratorUtil: ResponseGeneratorUtil,
    private readonly encryptionService: EncryptionService
  ) {}

  @Post()
  @UseFilters(TokenErrorFilter)
  updateRegistry(@Body() registry: UpdateRegistryDto) {
    this.encryptionService.setup();
    registry.key = this.encryptionService.decrypt(registry.key);
    this.registriesService.save(registry);
    return this.responseGeneratorUtil
      .genGenericResponse(
        HttpStatus.CREATED,
        ResponseMessages.DATA_SAVED,
        null
      );
  }

  @Get("/:key")
  @UseFilters(TokenErrorFilter)
  async getRegistry(@Param("key") key: string) {
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
