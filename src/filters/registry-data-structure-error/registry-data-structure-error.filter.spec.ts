import { ResponseService } from 'src/utils/response/response.service';
import { RegistryDataStructureErrorFilter } from './registry-data-structure-error.filter';

describe('RegistryDataErrorFilter', () => {
  it('should be defined', () => {
    expect(new RegistryDataStructureErrorFilter(new ResponseService())).toBeDefined();
  });
});
