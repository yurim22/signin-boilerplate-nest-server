import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './configs/config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [UsersModule]
})
export class AppModule {}
