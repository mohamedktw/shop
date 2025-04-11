import { Request, Response } from "express";
import { createUser } from "../models/user.model";
import { sendUserCreatedEvent } from "../services/kafka.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUser({ name, email, password });

        // Send user created event to Kafka
        await sendUserCreatedEvent({ id: user.id, email: user.email, password: user.password })

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err });
    }
}