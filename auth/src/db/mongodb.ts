import { MongoClient } from 'mongodb';
import config from '../config';

declare global {
    var mongoClient : MongoClient
};


const mongoClient = global.mongoClient || new MongoClient(config.MONGO_URI);


if (config.NODE_ENV === 'development') global.mongoClient = mongoClient;

// Take a database
export const db = mongoClient.db(config.DATABASE_NAME);

export default mongoClient;