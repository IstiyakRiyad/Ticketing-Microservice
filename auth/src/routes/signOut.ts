import { Request, Response, NextFunction, Router } from "express";
import { requestValidator } from "../middleware/requestValidator";
import { User, Users } from "../models/user";
import {BadRequestError, NotAuthorizedError} from '@istiyakriyad/common'
import Password from "../services/Password";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("refreshToken");

        return res.json({
            message: "Logged out"
        });
    }
    catch(error) {
        next(error);
    }
});


export default router;