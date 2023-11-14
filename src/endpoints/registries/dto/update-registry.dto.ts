import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";

export class UpdateRegistryDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cacheId: string

    @ApiProperty()
    @IsObject()
    @IsNotEmptyObject()
    data: any
}
