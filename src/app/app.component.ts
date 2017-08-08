import * as dotenv from 'dotenv';
import * as express from 'express';

import { LoggerComponent } from './../core/logger/logger.component';
import { LoggerConfig } from '../core/logger/logger.config';

export interface Configurable {
  configure(app: AppComponent): void;
}

export class AppComponent {
  private configurations: Configurable[] = [];
  private express: express.Application = express();
  private log: LoggerComponent = new LoggerComponent(__filename);

  constructor() {
    dotenv.config();
    const loggerConfig = new LoggerConfig();
    loggerConfig.configure();
    this.log.info('Bootstrapping Express Instance...');
  }

  get Express(): express.Application {
    return this.express;
  }

  public Logger(scope: string): LoggerComponent {
    return new LoggerComponent(scope || __filename);
  }

  public configure(configurations: Configurable): void {
    this.configurations.push(configurations);
  }

  public async bootstrap(): Promise<void> {

  }
}
