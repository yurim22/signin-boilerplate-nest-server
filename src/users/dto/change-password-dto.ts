import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangePasswordDto {

    @ApiProperty()
    @IsString()
    readonly oldPassword: string

    @ApiProperty()
    @IsString()
    readonly newPassword: string
    
}