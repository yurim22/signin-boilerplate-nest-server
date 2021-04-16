import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SecurityConfig } from "src/configs/config.interface";
import { PasswordService } from "src/services/password.service";
import { PrismaService } from "src/services/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
            const securityConfig = configService.get<SecurityConfig>('security');
            return {
                secret: configService.get<string>('jwtSecretKey.secretOrKey'),
                signOptions: {
                    expiresIn: securityConfig.expiresIn,
                },
            };
            },
            inject: [ConfigService],
        }),
        ConfigService
    ],
    providers: [PrismaService, AuthService, JwtStrategy, PasswordService],
    controllers:[AuthController],
    exports: [AuthModule]
})

export class AuthModule {}


// import { Module } from "@nestjs/common";
// import { PrismaService } from "src/services/prisma.service";
// import { UsersController } from "./users.controller";
// import { UsersService } from './users.service';

// @Module({
//     imports:[],
//     providers: [PrismaService, UsersService],
//     controllers: [UsersController]
// })

// export class UsersModule {}