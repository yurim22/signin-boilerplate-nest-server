import { Permission } from '.prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly password: string

    @IsString()
    readonly name: string

    @IsString()
    readonly permission: Permission

    @IsString()
    @IsOptional()
    readonly institution: string
}