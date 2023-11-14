import { Body, Controller, Get, HttpStatus, Post, Query, UseFilters } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseService } from 'src/utils/response/response.service';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { TokenErrorFilter } from 'src/filters/token-error/token-error.filter';
import { Headers } from 'src/decorators/decorators';
import { TokenDecryptionPipe } from 'src/pipes/token-decryption/token-decryption.pipe';
import { UuidValidationPipe } from 'src/pipes/uuid-validation/uuid-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'src/models/response/response';
import { RegistryDataValidationPipe } from 'src/pipes/registry-data-validation/registry-data-validation.pipe';
import { RegistryDataErrorFilter } from 'src/filters/registry-data-error/registry-data-error.filter';
import { CacheIdValidatorPipe } from 'src/pipes/cache-id-validator/cache-id-validator.pipe';
import { CacheIdErrorFilter } from 'src/filters/cache-id-error/cache-id-error.filter';
import { RegistryDataSizeValidatorPipe } from 'src/pipes/registry-data-size-validator/registry-data-size-validator.pipe';
import { RegistryDataSizeErrorFilter } from 'src/filters/registry-data-size-error/registry-data-size-error.filter';

@ApiBearerAuth()
@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private readonly responseService: ResponseService
  ) {}

  @ApiOperation({ summary: 'Used to save a data in the cache' })
  @ApiResponse({ status: 201, description: "The data was stored succesfully" })
  @ApiResponse({ status: 403, description: "The token was not accepted, so the access was restricted" })
  @ApiResponse({ status: 422, description: "The data is not of valid type" })
  @ApiResponse({ status: 422, description: "The data exceeds maximum size in bytes" })
  @ApiCreatedResponse({ description: 'The data was stored in the cache', schema: { example: new Response(HttpStatus.CREATED, ResponseMessages.DATA_SAVED, null) } })
  @ApiBody({
    type: UpdateRegistryDto,
    examples: {
      a: {
        summary: "Valid Data",
        description: "Data to be cached, the structure can a string, number or arbitrary object(except null)",
        value: { data: {
          name: "John Doe", birthday: "12/12/2222" }
        }
      }
    }
  })
  @Post()
  @UseFilters(TokenErrorFilter, RegistryDataErrorFilter, RegistryDataSizeErrorFilter)
  updateRegistry(@Body(RegistryDataValidationPipe, new RegistryDataSizeValidatorPipe(1048576)) registry: UpdateRegistryDto, @Headers("Authorization", TokenDecryptionPipe, UuidValidationPipe) uuid: string) {
    this.registriesService.save(registry, uuid);
    return this.responseService
      .genGenericResponse(
        HttpStatus.CREATED,
        ResponseMessages.DATA_SAVED,
        null
      );
  }

  @ApiOperation({ summary: 'Used to retrieve the data from the cache' })
  @ApiResponse({ status: 302, description: "The data was retrieved succesfully" })
  @ApiResponse({ status: 403, description: "The token was not accepted, so the access was restricted" })
  @ApiResponse({ status: 400, description: "The cache id is invalid" })
  @ApiCreatedResponse({ description: 'The data was retrieved from the cache', schema: { example: new Response(HttpStatus.FOUND, ResponseMessages.DATA_RETRIEVED, { name: "John Doe", birthday: "12/12/2222" }) } })
  @Get()
  @UseFilters(TokenErrorFilter, CacheIdErrorFilter)
  async getRegistry(@Query("cacheId", CacheIdValidatorPipe) cacheId: string, @Headers("Authorization", TokenDecryptionPipe, UuidValidationPipe) uuid: string) {
    const payload = await this.registriesService.obtainWith(uuid, cacheId);
    return this.responseService
      .genGenericResponse(
        HttpStatus.FOUND,
        ResponseMessages.DATA_RETRIEVED,
        payload
      );
  }
}
