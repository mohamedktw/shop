import express from 'express';
import { startConsumer } from './consumers/user-created.consumer';

const app = express();

const start = async () => {
    await startConsumer();
    app.listen(3002, () => {
        console.log('Order service running on port 3002');
    });
};

start();