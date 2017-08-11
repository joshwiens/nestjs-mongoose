import { Component } from '@nestjs/common';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';

@Component()
export class AppConfiguration {
  public configure(express: express.Application) {
    express
      .options('*', cors())
      .use(cors())
      .use(helmet())
      .use(helmet.noCache())
      .use(
        helmet.hsts({
          maxAge: 15768000,
          includeSubdomains: true,
        }),
      )
      .use(compression())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
      return express;
  }
}
