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
        // 1. 사용자가 입력한 id를 바탕으로 db에서 id 찾기(findUnique)
        var user = await this.prisma.user.findUnique(
            {
                where: {id: id}
            }
        );
        // 2. id가 없다면, NotFoundException 발생시키고 종료
        if(!user) {
            throw new NotFoundException(`No user found : ${id}`)
        }
        
        // 3. id가 있는 경우에, user.invalid_password_count 확인
        // 이미 5회 이상 로그인 실패한 경우, 바로 에러 발생(BadRequestException)
        if(user.invalid_password_count == 5){
            throw new BadRequestException('Wrong password more than 5 times')
        } else{
            // 4. id가 있고 invalid_password_count도 5보다 적은 경우, 입력한 id를 바탕으로 password validation 실행
            const passwordValid = await this.passwordService.validatePassword(pwd, user.password)
            
            // 5. password 틀렸을 때, invalid_password_cound 하나씩 증가
            if(!passwordValid) {
                const update_invalid_password_count = user.invalid_password_count + 1
                // 6. 5회 이상 로그인 실패 시 에러 생성
                if(update_invalid_password_count > 5) {
                    throw new NotFoundException('Wrong password more than 5 times')
                } else {
                    // 7. lock 조건 충족 안되었을 경우, invalid_password_count update 시켜서 db에 저장
                    // 비밀번호 틀렸다는 에러 발생
                    await this.prisma.user.update({
                        where: {id: user.id},
                        data: { invalid_password_count: update_invalid_password_count}
                    })
                    throw new NotFoundException('Invalid Password');
                }
            }
        }

        // 8. 로그인 성공한 경우에 invalid_password_count를 0으로 바꿔준다.
        await this.prisma.user.update({
            where: {id: user.id},
            data: { invalid_password_count: 0}
        })
        await this.prisma.user_signin_history.create({
            data: {
                id: user.id
            }
        })
        const { password, ...result} = user
        return result;
    }

    //user login feature
    async signIn(signinInfo: SignInDTO): Promise<any> {
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

    //refreshToken을 받아서 새로운 token을 생성한다.
    async refreshToken(token: string): Promise<Token> {
        try{
            const { userId, sub } = this.jwtService.verify(token);
            console.log('create new token')
            return this.generateToken({
                userId, sub
            })
        } catch(e) {
            throw new UnauthorizedException();
        }
    }

    async signout(data: Prisma.user_signin_historyUpdateArgs) {
        return await this.prisma.user_signin_history.update(data)
    }

}