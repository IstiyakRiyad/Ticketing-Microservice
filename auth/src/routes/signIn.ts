import { Request, Response, NextFunction, Router } from "express";
import jwt from 'jsonwebtoken';
import { requestValidator } from "../middleware/requestValidator";
import { User, Users } from "../models/user";
import {BadRequestError, NotAuthorizedError} from '@istiyakriyad/common'
import Password from "../services/Password";
import config from '../config';

const router = Router();

router.post("/", requestValidator({body: User}), async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({email});

        if(!user) throw new BadRequestError("User not found");

        const check = await Password.compare(user.password, password);

        if(!check) throw new NotAuthorizedError("Incorrect password");

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user._id,
                email: user.email,
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
            message: "Logged in"
        });
    }
    catch(error) {
        next(error);
    }
});


export default router;