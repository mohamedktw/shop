import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export const sendUserCreatedEvent = async (user: any) => {
    await producer.send({
        topic: "user-created",
        messages: [{ value: JSON.stringify(user) }],
    });
};