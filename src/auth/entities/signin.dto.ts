import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string
}