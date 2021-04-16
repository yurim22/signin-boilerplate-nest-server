import { Prisma } from ".prisma/client";
import { ConflictException, Injectable } from "@nestjs/common";
import { user } from "@prisma/client";
import { PasswordService } from "src/services/password.service";
import { PrismaService } from "src/services/prisma.service";

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
        const user =  await this.prisma.user.findUnique(data)

        const { password, ...result} = user
        return result
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
}