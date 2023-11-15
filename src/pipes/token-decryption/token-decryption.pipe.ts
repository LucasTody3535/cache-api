import { Injectable, PipeTransform } from '@nestjs/common';
import { TokenError } from '../../models/errors/internal/token-error/token-error';
import { EncryptionService } from '../../utils/encryption/encryption.service';

@Injectable()
export class TokenDecryptionPipe implements PipeTransform {
  constructor(private readonly encryptionService: EncryptionService) {}

  transform(value: string, _: never) {
    this.encryptionService.setup();
    try {
      value = this.encryptionService.decrypt(value.split(' ')[1]);
    } catch {
      throw new TokenError();
    }
    return value;
  }
}
