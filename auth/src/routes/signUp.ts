import { Request, Response, NextFunction, Router } from "express";
import { requestValidator } from "../middleware/requestValidator";
import { User, Users } from "../models/user";
import { BadRequestError } from '@istiyakriyad/common'
import jwt from 'jsonwebtoken';
import Password from "../services/Password";
import config from '../config';

const router = Router();

router.post("/", requestValidator({ body: User }), async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (user) throw new BadRequestError("Email is used");

        req.body.password = await Password.hash(password);

        const createdUser = await Users.insertOne(req.body);

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: createdUser.insertedId,
                email,
            },
            config.JWT_KEY
        );
        
        // Set cookie to response
        res.cookie('refreshToken', userJwt, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: config.NODE_ENV === 'production' ? true : false,
            path: '/'
        });

        return res.json({
            message: "Account created"
        });
    }
    catch (error) {
        next(error);
    }
});


export default router;