import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: "Please check name, email and password" });
    }
    next();

};