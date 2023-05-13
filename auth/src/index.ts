import config from './config';
import mongoClient from './db/mongodb';
import {app} from './app';


const start =async () => {
    try {
        await mongoClient.connect();

        app.listen(config.PORT, ()=> {
            console.log(`Server is running on port ${config.PORT}`);
        });
    }
    catch(error) {
        console.log(error);
    }
}

start();