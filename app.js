import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetRouter from './router/tweet.js';
import authRouter from './router/auth.js'
import { config } from './config.js';
import {initSocket} from './connection/socket.js';
import {sequelize } from './db/database.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/tweets' , tweetRouter);
app.use('/auth', authRouter);

app.use((req,res,next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    const server = app.listen(config.host.serverPort);
    initSocket(server);
});
