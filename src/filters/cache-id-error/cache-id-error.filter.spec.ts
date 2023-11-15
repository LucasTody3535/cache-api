import { ResponseService } from '../../utils/response/response.service';
import { CacheIdErrorFilter } from './cache-id-error.filter';

describe('CacheIdErrorFilter', () => {
  it('should be defined', () => {
    expect(new CacheIdErrorFilter(new ResponseService())).toBeDefined();
  });
});
