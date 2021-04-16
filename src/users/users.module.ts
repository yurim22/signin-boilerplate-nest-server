import { Module } from "@nestjs/common";
import { PasswordService } from "src/services/password.service";
import { PrismaService } from "src/services/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from './users.service';

@Module({
    imports:[],
    providers: [PrismaService, UsersService, PasswordService],
    controllers: [UsersController]
})

export class UsersModule {}