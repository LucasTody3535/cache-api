import { ResponseService } from '../../utils/response/response.service';
import { RegistryDataSizeErrorFilter } from './registry-data-size-error.filter';

describe('RegistryDataSizeErrorFilter', () => {
  it('should be defined', () => {
    expect(new RegistryDataSizeErrorFilter(new ResponseService())).toBeDefined();
  });
});
