import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { ResponseService } from 'src/utils/response/response.service';
import { Request, Response } from 'express';
import { ErrorInfo } from 'src/models/errors/external/error-info/error-info';
import { ErrorSubjects } from 'src/enums/error/subjects/error-subjects';
import { ErrorMessages } from 'src/enums/error/messages/error-messages';
import { DataError } from 'src/models/errors/internal/data-error/data-error';

@Catch(DataError)
export class DataErrorFilter<T> implements ExceptionFilter {
  constructor(private responseService: ResponseService) {}

  catch(_: never, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorInfo = new ErrorInfo(ErrorSubjects.DATA, ErrorMessages.INVALID_DATA, [], request.path);

    response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json(
        this.responseService
            .genErrorResponse(
              HttpStatus.UNPROCESSABLE_ENTITY,
              ResponseMessages.COULD_NOT_DO_OPERATION,
              errorInfo
            )
        );
  }
}
