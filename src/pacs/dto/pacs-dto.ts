import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PacsDto {
    @ApiProperty()
    @IsString()
    readonly ae: string;

    @ApiProperty()
    @IsString()
    readonly ip: string;

    @ApiProperty()
    @IsString()
    readonly port: string;

    @ApiProperty()
    @IsString()
    readonly userId: string;
}