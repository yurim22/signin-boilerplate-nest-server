import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StudyService } from './studies/study.service';
import { StudiesController } from './studies/study.controller';
import { StudyModule } from './studies/study.module';
import config from './configs/config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        UsersModule,
        AuthModule,
        StudyModule
    ],
    controllers: [AppController, StudiesController],
    providers: [AppService, PrismaService, StudyService],
    exports: [UsersModule]
})
export class AppModule {}
