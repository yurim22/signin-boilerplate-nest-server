import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3000,
    },
    // cors: {
    //     enabled: true,
    // },
    // graphql: {
    //     playgroundEnabled: true,
    //     debug: true,
    //     schemaDestination: './src/schema.graphql',
    //     sortSchema: true,
    // },
    security: {
        expiresIn: '5h',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
    jwtSecretKey:{
        secretOrKey: 'JUNOJWTSECRETKEY'
    }
}

export default (): Config => config;