import { Request, Response, NextFunction, Router } from "express";
import { Users } from "../models/user";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Users.findOne();

        return res.json({
            message: "Logged in",
            data: user
        });
    }
    catch(error) {
        next(error);
    }
});


export default router;