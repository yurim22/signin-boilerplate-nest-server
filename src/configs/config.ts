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
        expiresIn: '1h',
        refreshIn: '3d',
        bcryptSaltOrRound: 10,
    },
    jwtSecretKey:{
        secretOrKey: 'JUNOJWTSECRETKEY'
    }
}

export default (): Config => config;