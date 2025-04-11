import express from "express";
import userRoutes from "./routes/user.routes";
import { producer } from "./services/kafka.service";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const start = async() => {
    await producer.connect();
    await app.listen(3001, () => {
        console.log("User service running on port 3001");
    });
};

start();