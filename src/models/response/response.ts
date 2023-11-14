import { HttpStatus } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';

export class Response<Payload> {
  httpStatus: HttpStatus;
  message: ResponseMessages;
  payload: Payload;

  constructor(
    httpStatus: HttpStatus,
    message: ResponseMessages,
    payload: Payload,
  ) {
    this.httpStatus = httpStatus;
    this.message = message;
    this.payload = payload;
  }
}
