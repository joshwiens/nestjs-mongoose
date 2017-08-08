import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { LoggerComponent } from '../core/logger/logger.component';
import { AppComponent, Configurable } from './app.component';

export class AppConfig implements Configurable {
  public configure(app: AppComponent): void {
    const logger = new LoggerComponent();

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
      )
      .use(
        morgan('dev', {
          stream: {
            write: logger.info.bind(logger),
          },
        }),
      );
  }
}
