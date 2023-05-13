import { MongoClient } from 'mongodb';
import config from '../config';

declare global {
    var mongoClient : MongoClient
};


const mongoClient = global.mongoClient || new MongoClient(config.MONGO_URI);


if (config.NODE_ENV === 'development') global.mongoClient = mongoClient;


export default mongoClient;