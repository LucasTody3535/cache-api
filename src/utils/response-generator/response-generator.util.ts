import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/enums/response/messages/response.messages';
import { Response } from 'src/models/response/response';

@Injectable()
export class ResponseGeneratorUtil {
    genGenericResponse(httpStatus: HttpStatus, message: ResponseMessages, payload: unknown) {
        return new Response<unknown>(httpStatus, message, payload);
    }
}