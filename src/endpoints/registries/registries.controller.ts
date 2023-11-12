import { Body, Controller, Get, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseService } from 'src/utils/response/response.service';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { TokenErrorFilter } from 'src/filters/token-error/token-error.filter';
import { Headers } from 'src/decorators/decorators';
import { TokenDecryptionPipe } from 'src/pipes/token-decryption/token-decryption.pipe';
import { UuidValidationPipe } from 'src/pipes/uuid-validation/uuid-validation.pipe';

@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private readonly responseService: ResponseService
  ) {}

  @Post()
  @UseFilters(TokenErrorFilter)
  updateRegistry(@Body() registry: UpdateRegistryDto, @Headers("Authorization", TokenDecryptionPipe, UuidValidationPipe) key: string) {
    this.registriesService.save(registry, key);
    return this.responseService
      .genGenericResponse(
        HttpStatus.CREATED,
        ResponseMessages.DATA_SAVED,
        null
      );
  }

  @Get()
  @UseFilters(TokenErrorFilter)
  async getRegistry(@Headers("Authorization", TokenDecryptionPipe, UuidValidationPipe) key: string) {
    const payload = await this.registriesService.obtainWith(key);
    return this.responseService
      .genGenericResponse(
        HttpStatus.FOUND,
        ResponseMessages.DATA_RETRIEVED,
        payload
      );
  }
}
