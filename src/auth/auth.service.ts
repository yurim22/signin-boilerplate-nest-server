import { Prisma } from ".prisma/client";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/services/prisma.service";
import { PasswordService } from "src/services/password.service";
import { Token } from "./entities/token.entity";
import { SecurityConfig } from "src/configs/config.interface";
import { SignInDTO } from "./entities/signin.dto";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService:JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly passwordService: PasswordService
    ) {}
    
    async validateUser(id: string, pwd: string): Promise<any> {
        console.log('this is user is',id);
        const user = await this.prisma.user.findUnique(
            {
                where: {id: id}
            }
        );
        if(!user) {
            throw new NotFoundException(`No user found : ${id}`)
        }

        // 2. id가 있다면, 입력한 id를 바탕으로 password validation 실행
        const passwordValid = await this.passwordService.validatePassword(pwd, user.password)
        if(!passwordValid) {
            throw new BadRequestException('Invalid Password');
        }

        const { password, ...result} = user
        return result;
    }

    //user login feature
    async signIn(signinInfo: SignInDTO): Promise<Token> {

        const user = await this.validateUser(signinInfo.id, signinInfo.password)
        
        return this.generateToken({
            userId: user.id,
            sub: user.name
        })
    }
    
    // jwtService의 sign() : jwt 생성
    // Note: we choose a property name of sub to hold our user_idx value to be consistent with JWT standards
    async generateToken(payload: {userId: string, sub: string}): Promise<Token> {
        // const payload = {userId: user.id, sub: user.seq}
        // accessToken은 username을 payload에 가지고 필요할 때마다 파싱해서 쓸 수 있게 함
        const accessToken = this.jwtService.sign(payload);

        const securityConfig = this.configService.get<SecurityConfig>('security');
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: securityConfig.refreshIn,
        })
        //expiresIn : 토큰 만료일

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(token: string): Promise<Token> {
        try{
            const { userId, sub } = this.jwtService.verify(token);

            return this.generateToken({
                userId, sub
            })
        } catch(e) {
            throw new UnauthorizedException();
        }
    }

}