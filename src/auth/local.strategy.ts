import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(userId: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(userId, password);
        if(!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}