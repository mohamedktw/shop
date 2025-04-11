import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
    groupId: "order-service-group"
});

const Prisma = new PrismaClient();

export const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "user-created", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value?.toString() || "{}");
            console.log("Received User ", data);

            await Prisma.userProfile.create({
                data: {
                    userId: data.id,
                    email: data.email,
                }
            });
        }
    });
};