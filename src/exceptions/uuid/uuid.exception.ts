import { HttpStatus } from '@nestjs/common';

export class UuidException extends Error {
    private status: HttpStatus

    constructor(message: string, status: HttpStatus) {
        super(message);
        this.status = status;
    }
}
