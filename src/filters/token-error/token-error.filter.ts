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
import { TokenError } from '../../models/errors/internal/token-error/token-error';
import { UuidError } from '../../models/errors/internal/uuid-error/uuid-error';

@Catch(TokenError, UuidError)
export class TokenErrorFilter<T> implements ExceptionFilter {
  constructor(private responseService: ResponseService) {}

  catch(_: never, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorInfo = new ErrorInfo(
      ErrorSubjects.TOKEN,
      ErrorMessages.INVALID_TOKEN,
      [],
      request.path,
    );

    response
      .status(HttpStatus.FORBIDDEN)
      .json(
        this.responseService.genErrorResponse(
          HttpStatus.FORBIDDEN,
          ResponseMessages.COULD_NOT_DO_OPERATION,
          errorInfo,
        ),
      );
  }
}
