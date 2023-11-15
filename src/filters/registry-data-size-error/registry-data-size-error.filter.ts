import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ResponseMessages } from '../../enums/response/messages/response.messages';
import { ResponseService } from '../../utils/response/response.service';
import { Request, Response } from 'express';
import { ErrorInfo } from '../../models/errors/external/error-info/error-info';
import { ErrorSubjects } from '../../enums/error/subjects/error-subjects';
import { ErrorMessages } from '../../enums/error/messages/error-messages';
import { RegistryDataSizeError } from '../../models/errors/internal/registry-data-size-error/registry-data-size-error';

@Catch(RegistryDataSizeError)
export class RegistryDataSizeErrorFilter<T> implements ExceptionFilter {
  constructor(private responseService: ResponseService) {}

  catch(_: never, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorInfo = new ErrorInfo(
      ErrorSubjects.DATA,
      ErrorMessages.REGISTRY_TOO_LARGE,
      [],
      request.path,
    );

    response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json(
        this.responseService.genErrorResponse(
          HttpStatus.UNPROCESSABLE_ENTITY,
          ResponseMessages.COULD_NOT_DO_OPERATION,
          errorInfo,
        ),
      );
  }
}
