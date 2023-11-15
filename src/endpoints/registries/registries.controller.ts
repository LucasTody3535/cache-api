import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseService } from '../../utils/response/response.service';
import { ResponseMessages } from '../../enums/response/messages/response.messages';
import { TokenErrorFilter } from '../../filters/token-error/token-error.filter';
import { Headers } from '../../decorators/decorators';
import { TokenDecryptionPipe } from '../../pipes/token-decryption/token-decryption.pipe';
import { UuidValidationPipe } from '../../pipes/uuid-validation/uuid-validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from '../../models/response/response';
import { RegistryDataStructureValidationPipe } from '../../pipes/registry-data-structure-validation/registry-data-structure-validation.pipe';
import { RegistryDataStructureErrorFilter } from '../../filters/registry-data-structure-error/registry-data-structure-error.filter';
import { CacheIdValidatorPipe } from '../../pipes/cache-id-validator/cache-id-validator.pipe';
import { CacheIdErrorFilter } from '../../filters/cache-id-error/cache-id-error.filter';
import { RegistryDataSizeValidatorPipe } from '../../pipes/registry-data-size-validator/registry-data-size-validator.pipe';
import { RegistryDataSizeErrorFilter } from '../../filters/registry-data-size-error/registry-data-size-error.filter';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiBearerAuth()
@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: 'Used to save a data in the cache' })
  @ApiResponse({ status: 201, description: 'The data was stored succesfully' })
  @ApiResponse({
    status: 403,
    description: 'The token was not accepted, so the access was restricted',
  })
  @ApiResponse({ status: 422, description: 'The data is not of valid type' })
  @ApiResponse({
    status: 422,
    description: 'The data exceeds maximum size in bytes',
  })
  @ApiCreatedResponse({
    description: 'The data was stored in the cache',
    schema: {
      example: new Response(
        HttpStatus.CREATED,
        ResponseMessages.DATA_SAVED,
        null,
      ),
    },
  })
  @ApiBody({
    type: UpdateRegistryDto,
    examples: {
      a: {
        summary: 'Valid Data',
        description:
          'Data to be cached, the structure can a string, number or arbitrary object(except null)',
        value: {
          data: {
            name: 'John Doe',
            birthday: '12/12/2222',
          },
        },
      },
    },
  })
  @Post()
  @UseFilters(
    TokenErrorFilter,
    RegistryDataStructureErrorFilter,
    RegistryDataSizeErrorFilter,
  )
  @UseGuards(ThrottlerGuard)
  updateRegistry(
    @Body(
      RegistryDataStructureValidationPipe,
      new RegistryDataSizeValidatorPipe(1048576),
    )
    registry: UpdateRegistryDto,
    @Headers('Authorization', TokenDecryptionPipe, UuidValidationPipe)
    uuid: string,
  ) {
    this.registriesService.save(registry, uuid);
    return this.responseService.genGenericResponse(
      HttpStatus.CREATED,
      ResponseMessages.DATA_SAVED,
      null,
    );
  }

  @ApiOperation({ summary: 'Used to retrieve the data from the cache' })
  @ApiResponse({
    status: 302,
    description: 'The data was retrieved succesfully',
  })
  @ApiResponse({
    status: 403,
    description: 'The token was not accepted, so the access was restricted',
  })
  @ApiResponse({ status: 400, description: 'The cache id is invalid' })
  @ApiCreatedResponse({
    description: 'The data was retrieved from the cache',
    schema: {
      example: new Response(HttpStatus.FOUND, ResponseMessages.DATA_RETRIEVED, {
        name: 'John Doe',
        birthday: '12/12/2222',
      }),
    },
  })
  @Get()
  @UseGuards(ThrottlerGuard)
  @UseFilters(TokenErrorFilter, CacheIdErrorFilter)
  async getRegistry(
    @Query('cacheId', CacheIdValidatorPipe) cacheId: string,
    @Headers('Authorization', TokenDecryptionPipe, UuidValidationPipe)
    uuid: string,
  ) {
    const payload = await this.registriesService.obtainWith(uuid, cacheId);
    return this.responseService.genGenericResponse(
      HttpStatus.FOUND,
      ResponseMessages.DATA_RETRIEVED,
      payload,
    );
  }
}
