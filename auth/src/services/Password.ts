import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export default class Password {
    constructor() {};

    static async hash(password:string) {
        const salt = randomBytes(10).toString('hex');

        const buf = await scryptAsync(password, salt, 64) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, password: string) {
        const [bufString, salt] = storedPassword.split(".");

        const hash = await scryptAsync(password, salt, 64) as Buffer;

        return bufString === hash.toString('hex');
    }
}