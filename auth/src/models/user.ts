import { WithId } from 'mongodb';
import * as z from 'zod';
import {db} from '../db/mongodb';


export const User = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(127)
});

export type User = z.infer<typeof User>;

export type UserWithId = WithId<User>;

export const Users = db.collection<User>("users");

Users.createIndex({email: 1})
.then(indexValue => console.log(`${indexValue} index is created.`));