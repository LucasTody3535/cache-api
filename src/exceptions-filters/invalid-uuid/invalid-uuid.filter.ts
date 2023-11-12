import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { Response } from 'express';
import { UuidError } from 'src/models/errors/internal/uuid-error/uuid-error';

@Catch(UuidError)
export class InvalidUuidFilter<T> implements ExceptionFilter {
  constructor(private responseGeneratorUtil: ResponseGeneratorUtil) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.FORBIDDEN)
      .json(
        this.responseGeneratorUtil
            .genGenericResponse(
              HttpStatus.FORBIDDEN,
              ResponseMessages.DATA_NOT_SAVED,
              exception.message
            )
        );
  }
}
