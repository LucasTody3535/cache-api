import { Injectable } from '@nestjs/common';
import { UuidError } from 'src/models/errors/internal/uuid-error/uuid-error';
import { validate, version } from 'uuid';

@Injectable()
export class UuidValidator {
    isUuidv4(uuid: string) {
        if(validate(uuid) && version(uuid) === 4) return;
        throw new UuidError();
    }
}
