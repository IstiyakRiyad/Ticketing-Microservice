import dotEnv from 'dotenv';

// Load the env
dotEnv.config();


// ENV interface
interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
}

// CONFIG interface 
interface Config {
    NODE_ENV: string,
    PORT: number,
    MONGO_URI: string
}

const getConfig = (): ENV => {
    return {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        NODE_ENV: process.env.NODE_ENV
    }
}


const getSanitzedConfig = (config: ENV): Config => {
    for(const [key, value] of Object.entries(config)) {
        if(value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }

    return config as Config;
}

const config = getConfig();

const sanitzedConfig = getSanitzedConfig(config);

export default sanitzedConfig;