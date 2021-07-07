import { Prisma } from ".prisma/client";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { user } from "@prisma/client";
import { PasswordService } from "src/services/password.service";
import { PrismaService } from "src/services/prisma.service";
import { ChangePasswordDto } from "./dto/change-password-dto";

@Injectable()
export class UsersService{
    constructor(
        private prisma: PrismaService,
        private readonly passwordService: PasswordService
    ) {}

    getUsers() {
        return 'hello this is getUser function';
    }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async findOneUser(data: Prisma.userFindUniqueArgs) {

        try {
            const user =  await this.prisma.user.findUnique(data)
            const { password, ...result} = user
            return result
        }
        // const user =  await this.prisma.user.findUnique(data)
        catch(e) {
            throw new Error(e);
        }

    }

    async createUser(payload: Prisma.userCreateArgs): Promise<user> {
        const hashedPassword = await this.passwordService.hashPassword(payload.data.password)

        try {
            return await this.prisma.user.create({
                data: {
                    ...payload.data,
                    password: hashedPassword
                }
            })
        } catch(e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new ConflictException(`Id ${payload.data.id} already used.`);
            } else {
                throw new Error(e);
            }
        }
    }

    async updateUser(data: Prisma.userUpdateArgs): Promise<user> {
        const hashedPassword = await this.passwordService.hashPassword(data.data.password)

        try {
            return await this.prisma.user.update({
                data: {
                    ...data.data,
                    password: hashedPassword
                },
                where: {seq: data.where.seq}
            })
        } catch(e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new ConflictException(`Id ${data.data.id} already used.`);
            } else {
                throw new Error(e);
            }
        }
        //return await this.prisma.user.update(data)
    }
    
    async deleteUser(data: Prisma.userDeleteArgs): Promise<user> {
        return await this.prisma.user.delete(data)
    }

    async deleteManyUser(where: Prisma.userWhereInput) {
        await this.prisma.user.deleteMany({where});

        return true
    }

    async checkDuplicateId(userInputId: string) {
        const user =  await this.prisma.user.findUnique({
            where: {
                id: userInputId
            }
        })
        if(user){
            return true
        }else{
            return false
        }
    }

    async unlockSelectedUser(data: Prisma.userUpdateArgs): Promise<user> {
        return await this.prisma.user.update(data)
    }

    async updatePassword(data: ChangePasswordDto, userid: string): Promise<user> {
        var user = await this.prisma.user.findUnique(
            {
                where: {
                    id: userid
                }
            }
        )

        const passwordValid = await this.passwordService.validatePassword(data.oldPassword, user.password);
        if(!passwordValid) {
            throw new NotFoundException('Invalid Password')
        } else{
            const hashedPassword = await this.passwordService.hashPassword(data.newPassword);

            return await this.prisma.user.update({
                data: {
                    password: hashedPassword,
                    last_password_update_timestamp: new Date()
                },
                where: {
                    id: userid
                }
            })
        }
    }
    
    async validateUser(id: string, pwd: string): Promise<any> {
        var user = await this.prisma.user.findUnique(
            {where: {id: id}}
        )

        const passwordVaild = await this.passwordService.validatePassword(pwd, user.password);
        if(!passwordVaild) {
            throw new NotFoundException('Invalid Password')
        }
    }
    
}