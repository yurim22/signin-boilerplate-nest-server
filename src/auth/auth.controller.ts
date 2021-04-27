import { Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDTO } from './entities/signin.dto';
import { Token } from './entities/token.entity';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Body() data: SignInDTO): Promise<Token> {
        const {accessToken, refreshToken} = await this.authService.signIn(data)
        return {
            accessToken,
            refreshToken
        }
    }

    // @Patch('logout')
    // async logout(@Body() data): Promise<any> {
        
    // }

    @Patch('signout')
    async signout(@Body() data): Promise<any> {
        const dto: Prisma.user_signin_historyUpdateArgs = {
            where: {
                seq: data.history_seq
            },
            data: {
                sign_out_timestamp: data.sign_out_timestamp
            }
        }
        await this.authService.signout(dto)
    }

    @Post('silent-refresh')
    async silent_refresh(@Body() data): Promise<Token> {
        const {accessToken, refreshToken} = await this.authService.refreshToken(data.refreshToken)
        console.log(data)
        return {
            accessToken,
            refreshToken
        }
    }
}
