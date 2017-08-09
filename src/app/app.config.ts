import { Component } from '@nestjs/common';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { AppComponent } from './app.component';

@Component()
export class AppConfiguration {
  public configure(app: AppComponent) {
    app.Express
      .options('*', cors()) // TODO: pull this from .env
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
      return app.Express;
  }
}
