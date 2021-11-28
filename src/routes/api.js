import express from 'express';
import authRouter from './auth.route.js';
import twitRouter from './twit.route.js';

const app = express();

app.use('/auth', authRouter);
app.use('/twit', twitRouter);

export default app;