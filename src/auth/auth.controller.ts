import { Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './entities/signin.dto';
import { Token } from './entities/token.entity';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // @UseGuards(LocalAuthGuard)
    @ApiBody({type: SignInDTO})
    @Post('signin')
    async signIn(@Body() data: SignInDTO): Promise<any> {
        // token issuance
        const {accessToken, refreshToken} = await this.authService.signIn(data);
        console.log({accessToken, refreshToken});
        // user data 
            //user data promise type
        const userResult = await this.authService.validateUser(data.id, data.password);
        const userId = userResult.id;
        const passwordUpdateTimestamp = userResult.last_password_update_timestamp;
        console.log(passwordUpdateTimestamp)

        // user password validate (if password need to change)
        const currentDate = new Date();
        const sixMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth()-6));

        let pwdStatus = '';

        if(passwordUpdateTimestamp === null){
            console.log('first login')
            pwdStatus = 'first login';
        } else if(passwordUpdateTimestamp < sixMonthAgo){
            console.log('password expired')
            pwdStatus = 'password expired'
        } else {
            console.log('available password')
            pwdStatus = 'available password'
        }

        return {accessToken, refreshToken, userId, pwdStatus}
    }

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
        return {
            accessToken,
            refreshToken
        }
    }
}
