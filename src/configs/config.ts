import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3300,
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
        expiresIn: '30m',
        refreshIn: '2h',
        bcryptSaltOrRound: 10,
    },
    jwtSecretKey:{
        secretOrKey: 'THISISJUNOJWTSECRETKEY'
    }
}

export default (): Config => config;