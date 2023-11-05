import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { UpdateRegistryDto } from './dto/update-registry.dto';

@Controller('registries')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Post()
  updateRegistry(@Body() registry: UpdateRegistryDto) {
    this.registriesService.save(registry);
    return;
  }

  @Get("/:key")
  getRegistry(@Param("key") key: string) {
    return this.registriesService.obtainWith(key);
  }
}
