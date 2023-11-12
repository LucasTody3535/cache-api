import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { ResponseGeneratorUtil } from 'src/utils/response-generator/response-generator.util';
import { Request, Response } from 'express';
import { ErrorInfo } from 'src/models/errors/external/error-info/error-info';
import { ErrorSubjects } from 'src/enums/error/subjects/error-subjects';
import { ErrorMessages } from 'src/enums/error/messages/error-messages';
import { UuidError } from 'src/models/errors/internal/uuid-error/uuid-error';

@Catch(UuidError)
export class InvalidUuidFilter<T> implements ExceptionFilter {
  constructor(private responseGeneratorUtil: ResponseGeneratorUtil) {}

  catch(_: never, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorInfo = new ErrorInfo(ErrorSubjects.TOKEN, ErrorMessages.INVALID_TOKEN, [], request.path);

    response
      .status(HttpStatus.FORBIDDEN)
      .json(
        this.responseGeneratorUtil
            .genErrorResponse(
              HttpStatus.FORBIDDEN,
              ResponseMessages.DATA_NOT_SAVED,
              errorInfo
            )
        );
  }
}
