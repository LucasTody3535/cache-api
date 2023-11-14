import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { ErrorInfo } from 'src/models/errors/external/error-info/error-info';
import { Response } from 'src/models/response/response';

@Injectable()
export class ResponseService {
  genGenericResponse(
    httpStatus: HttpStatus,
    message: ResponseMessages,
    payload: unknown,
  ) {
    return new Response<unknown>(httpStatus, message, payload);
  }

  genErrorResponse(
    httpStatus: HttpStatus,
    message: ResponseMessages,
    errorInfo: ErrorInfo,
  ) {
    return new Response<ErrorInfo>(httpStatus, message, errorInfo);
  }
}
