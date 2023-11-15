import { ResponseService } from '../../utils/response/response.service';
import { TokenErrorFilter } from './token-error.filter';

describe('TokenErrorFilter', () => {
  it('should be defined', () => {
    expect(new TokenErrorFilter(new ResponseService())).toBeDefined();
  });
});
