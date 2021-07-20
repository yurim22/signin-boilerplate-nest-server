import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3300,
    },
    security: {
        expiresIn: '30m',
        refreshIn: '1h',
        bcryptSaltOrRound: 10,
    },
    jwtSecretKey:{
        secretOrKey: 'THISISJUNOJWTSECRETKEY'
    }
}

export default (): Config => config;