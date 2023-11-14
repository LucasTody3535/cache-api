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
import { TokenError } from 'src/models/errors/internal/token-error/token-error';
import { UuidError } from 'src/models/errors/internal/uuid-error/uuid-error';

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
