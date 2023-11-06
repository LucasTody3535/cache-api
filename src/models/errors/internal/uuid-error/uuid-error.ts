export class UuidError extends Error {
    static is(obj: Object) {
        return obj instanceof UuidError;
    }

    constructor(message: string) {
        super(message);
    }
}
