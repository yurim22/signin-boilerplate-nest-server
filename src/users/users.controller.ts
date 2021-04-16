import { Prisma, user } from '.prisma/client';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PasswordService } from 'src/services/password.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private passwordService: PasswordService){}

    @Get()
    async getAllUsers(): Promise<user[]>{
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async findOneUser(@Param('id') userId: string) {
        const dto: Prisma.userFindUniqueArgs = {
            where: { id: userId },
        };

        return await this.usersService.findOneUser(dto)
    }
    // @Get('/:seq')
    // async findOneUser(@Param('seq') userSeq: string) {
    //     const userSeqToInt = parseInt(userSeq);
    //     const dto: Prisma.userFindUniqueArgs = {
    //         where: { seq: userSeqToInt },
    //     };

    //     return await this.usersService.findOneUser(dto)
    // }

    @Post()
    async createUser(@Body() data: CreateUserDto) {
        const dto: Prisma.userCreateArgs = {
            data: {
                id: data.id,
                password: data.password,
                name: data.name,
                permission: data.permission,
                institution: data.institution
            }
        }

        return await this.usersService.createUser(dto)
    }

    @Patch(':seq')
    async updateUser(@Param('seq') userSeq: string, @Body() data: UpdateUserDto) {
        const userSeqToInt = parseInt(userSeq);
        const hashedPassword = await this.passwordService
        const dto: Prisma.userUpdateArgs = {
            data: {
                id: data.id,
                password: data.password,
                name: data.name,
                permission: data.permission,
                institution: data.institution
            },
            where: {seq: userSeqToInt}
        }

        return await this.usersService.updateUser(dto)
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        const dto: Prisma.userDeleteArgs = {
            where: {id: userId}
        }
        return await this.usersService.deleteUser(dto)

    }
    
    @Get('/checkId/:id')
    async checkDuplicateId(@Param('id') userInputId: string){
        return await this.usersService.checkDuplicateId(userInputId)
    }
}
