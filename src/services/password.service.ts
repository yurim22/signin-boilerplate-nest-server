import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from 'src/configs/config.interface';
import { compare, hash, genSalt } from "bcrypt";

@Injectable()
export class PasswordService{
    get bcryptSaltRounds(): string | number {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        const saltOrRounds = securityConfig.bcryptSaltOrRound;

        return Number.isInteger(Number(saltOrRounds)) ? Number(saltOrRounds) : saltOrRounds
    }

    constructor(private configService: ConfigService){}

    //check and compare password
    validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword)
    }

    // hash password
    // 같은 문자를 해싱하면 같은 결과값이 나오게 되므로 salting을 통해 암호화시킨다.
    async hashPassword(password): Promise<string> {
        const salt = await genSalt();
        return hash(password, salt)
    }
}