import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TokenError } from 'src/models/errors/internal/token-error/token-error';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

type Key = { key: string }

@Injectable()
export class TokenDecryptionPipe implements PipeTransform {
  constructor(private readonly encryptionService: EncryptionService) {}

  transform(value: Key, metadata: ArgumentMetadata) {
    this.encryptionService.setup();
    try {
      value.key = this.encryptionService.decrypt(value.key);
    } catch {
      throw new TokenError();
    }
    return value;
  }
}
