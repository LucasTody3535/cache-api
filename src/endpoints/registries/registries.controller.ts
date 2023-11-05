import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { Response } from 'src/models/response/response';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';

@Controller('registries')
export class RegistriesController {
  constructor(
    private readonly registriesService: RegistriesService,
    private responseGeneratorUtil: ResponseGeneratorUtil
  ) {}

  @Post()
  updateRegistry(@Body() registry: UpdateRegistryDto) {
    let res: Response<unknown>;
    try {
      this.registriesService.save(registry);
      res = this.responseGeneratorUtil
                .genGenericResponse(
                  HttpStatus.CREATED,
                  ResponseMessages.DATA_SAVED,
                  null
                );
    } catch(error: unknown) {
      res = this.responseGeneratorUtil
                .genGenericResponse(
                  HttpStatus.NOT_MODIFIED,
                  ResponseMessages.DATA_NOT_SAVED,
                  (error as Error).message
                );
    }
    return res;
  }

  @Get("/:key")
  getRegistry(@Param("key") key: string) {
    let res: Response<unknown>;
    let payload: unknown;
    try {
      payload = this.registriesService.obtainWith(key);
      res = this.responseGeneratorUtil
                .genGenericResponse(
                  HttpStatus.FOUND,
                  ResponseMessages.DATA_RETRIEVED,
                  null
                );
    } catch(error: unknown) {
      res = this.responseGeneratorUtil
                .genGenericResponse(
                  HttpStatus.NOT_FOUND,
                  ResponseMessages.DATA_NOT_RETRIEVED,
                  (error as Error).message
                );
    }
    return res;
  }
}
