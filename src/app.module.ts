import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EnvironmentService } from './environment/environment.service';
import { EnvironmentController } from './environment/environment.controller';
import { EnvironmentModule } from './environment/environment.module';
import config from './configs/config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        UsersModule,
        AuthModule,
        EnvironmentModule
    ],
    controllers: [AppController, EnvironmentController],
    providers: [AppService, PrismaService, EnvironmentService],
    exports: [UsersModule]
})
export class AppModule {}
