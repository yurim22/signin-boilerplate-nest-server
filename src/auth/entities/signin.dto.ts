import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDTO {
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string
}