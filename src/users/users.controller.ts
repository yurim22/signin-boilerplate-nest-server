import { Prisma, user } from '.prisma/client';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PasswordService } from 'src/services/password.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private passwordService: PasswordService){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUsers(): Promise<user[]>{
        return await this.usersService.getAllUsers();
    }

    @UseGuards(AuthGuard('jwt'))
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

    @ApiBody({type: CreateUserDto})
    @UseGuards(AuthGuard('jwt'))
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

    @ApiBody({type: UpdateUserDto})
    @UseGuards(AuthGuard('jwt'))
    @Patch(':seq')
    async updateUser(@Param('seq') userSeq: string, @Body() data: UpdateUserDto) {
        const userSeqToInt = parseInt(userSeq);
        // const hashedPassword = await this.passwordService
        const dto: Prisma.userUpdateArgs = {
            data: {
                id: data.id,
                password: data.password,
                name: data.name,
                permission: data.permission,
                institution: data.institution,
            },
            where: {seq: userSeqToInt}
        }

        return await this.usersService.updateUser(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        const dto: Prisma.userDeleteArgs = {
            where: {id: userId}
        }
        return await this.usersService.deleteUser(dto)

    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/checkId/:id')
    async checkDuplicateId(@Param('id') userInputId: string){
        return await this.usersService.checkDuplicateId(userInputId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/unlock/:id')
    async unlockSelectedUser(@Param('id') userId: string, @Body() data) {
        const dto: Prisma.userUpdateArgs = {
            where: {id: userId},
            data: {invalid_password_count: data.invalid_password_count}
        }
        return await this.usersService.unlockSelectedUser(dto)
    }

    @ApiBody({type: ChangePasswordDto})
    @UseGuards(AuthGuard('jwt'))
    @Patch('/changePwd/:id')
    async updatePassword(@Param('id') userid: string, @Body() data: ChangePasswordDto) {
        // const userSeqToInt = parseInt(userSeq);
        // const hashedPassword = await this.passwordService
        // const dto: Prisma.userUpdateArgs = {
        //     data: {
        //         password: data.newPassword
        //     },
        //     where: {id: userid}
        // }

        return await this.usersService.updatePassword(data, userid)
    }
}
