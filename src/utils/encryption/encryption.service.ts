import { Injectable } from '@nestjs/common';
import { Cipher, Decipher, createCipheriv, createDecipheriv, randomBytes } from "crypto";

@Injectable()
export class EncryptionService {
    static readonly KEY: Buffer          = randomBytes(32);
    static readonly ALGORITHM: string    = "aes-256-cbc";
    static readonly IV: Buffer           = randomBytes(16);
    private cipher: Cipher;
    private decipher: Decipher

    constructor() {}

    encrypt(value: string) {
        return this.cipher.update(value, "utf-8", "hex") + this.cipher.final("hex");
    }

    decrypt(value: string) {
        return this.decipher.update(value, "hex", "utf-8") + this.decipher.final("utf-8");
    }

    setup() {
        this.cipher = createCipheriv(EncryptionService.ALGORITHM, EncryptionService.KEY, EncryptionService.IV);
        this.decipher = createDecipheriv(EncryptionService.ALGORITHM, EncryptionService.KEY, EncryptionService.IV);
    }
}
