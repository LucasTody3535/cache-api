import { RegistryDataSizeValidatorPipe } from './registry-data-size-validator.pipe';

describe('RegistryDataSizeValidatorPipe', () => {
  it('should be defined', () => {
    expect(new RegistryDataSizeValidatorPipe(1048576)).toBeDefined();
  });
});
