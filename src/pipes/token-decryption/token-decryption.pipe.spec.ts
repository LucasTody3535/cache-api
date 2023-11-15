import { EncryptionService } from '../../utils/encryption/encryption.service';
import { TokenDecryptionPipe } from './token-decryption.pipe';

describe('TokenDecryptionPipe', () => {
  it('should be defined', () => {
    expect(new TokenDecryptionPipe(new EncryptionService())).toBeDefined();
  });
});
