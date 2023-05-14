import * as z from 'zod';
import { ObjectId } from 'mongodb';

export const IdParams = z.object({
    id: z.string().refine(id => {
        try {
            return new ObjectId(id);
        }
        catch(error) {
            return false;
        }
    })
});

export type IdParams = z.infer<typeof IdParams>;
