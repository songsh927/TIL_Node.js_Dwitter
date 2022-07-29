import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import tweetRouter from './router/tweet.js';
import authRouter from './router/auth.js'
import { config } from './config.js';
import {initSocket, getSocketIO} from './connection/socket.js';
import {sequelize } from './db/database.js';
import {TweetController} from './controller/tweet.js';
import * as tweetRepository from './data/tweet.js'


const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan('tiny'));

app.use('/tweets' , tweetRouter(new TweetController(tweetRepository, getSocketIO)));
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
