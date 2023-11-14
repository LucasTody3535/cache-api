import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { ResponseService } from 'src/utils/response/response.service';
import { Request, Response } from 'express';
import { ErrorInfo } from 'src/models/errors/external/error-info/error-info';
import { ErrorSubjects } from 'src/enums/error/subjects/error-subjects';
import { ErrorMessages } from 'src/enums/error/messages/error-messages';
import { CacheIdError } from 'src/models/errors/internal/cache-id-error/cache-id-error';

@Catch(CacheIdError)
export class CacheIdErrorFilter<T> implements ExceptionFilter {
  constructor(private responseService: ResponseService) {}

  catch(_: never, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorInfo = new ErrorInfo(
      ErrorSubjects.CACHE_ID,
      ErrorMessages.CACHE_ID,
      [],
      request.path,
    );

    response
      .status(HttpStatus.BAD_REQUEST)
      .json(
        this.responseService.genErrorResponse(
          HttpStatus.BAD_REQUEST,
          ResponseMessages.COULD_NOT_DO_OPERATION,
          errorInfo,
        ),
      );
  }
}
