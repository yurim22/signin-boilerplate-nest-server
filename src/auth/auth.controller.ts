import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './entities/signin.dto';
import { Token } from './entities/token.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signin')
    async signIn(@Body() data: SignInDTO): Promise<Token> {
        const {accessToken, refreshToken} = await this.authService.signIn(data)
        return {
            accessToken,
            refreshToken
        }
    }
}
