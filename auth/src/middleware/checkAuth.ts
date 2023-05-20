import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from '../config';
import {NotAuthorizedError} from '@istiyakriyad/common';

interface UserPayload {
    id: string;
    email: string;
    role: 'user';
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;

    // Verify
    const verify = jwt.verify(refreshToken, config.JWT_KEY) as UserPayload;

    if(!verify) return next(new NotAuthorizedError('You are not authorized. '));

    req.user = verify;
}