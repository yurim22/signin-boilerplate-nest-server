export interface Config {
    nest: NestConfig;
    // cors: CorsConfig;
    security: SecurityConfig;
    jwtSecretKey: JwtSecretKeyConfig
}

export interface NestConfig {
    port: number;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface SecurityConfig{
    expiresIn: string;
    refreshIn: string;
    bcryptSaltOrRound: string | number;
}

export interface JwtSecretKeyConfig{
    secretOrKey: string;
}