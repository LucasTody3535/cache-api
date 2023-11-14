import { ApiProperty } from "@nestjs/swagger";

export class UpdateRegistryDto {

    @ApiProperty()
    key: string

    @ApiProperty()
    data: any
}
