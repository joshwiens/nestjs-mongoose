import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as https from 'https';

import { AppModule } from './app/app.module';

const initOptions = {}; // Define this object in config.module
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const instance = https.createServer(initOptions, app).listen(process.env.API_PORT); // get from .env

const server = NestFactory.create(AppModule, instance);
server.setGlobalPrefix(process.env.API_PREFIX); // get prefix from .env

