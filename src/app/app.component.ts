import { AppBootstrap } from './app.bootstrap';
import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv';
import * as express from 'express';

import { AppConfiguration } from './app.config';

export interface Configuration {
  configure(app: AppComponent): void;
}

export class AppComponent {
  private readonly logger = new Logger('AppComponent');
  private configurations: Configuration[] = [];
  private express: express.Application = express();
  private appBootstrap = new AppBootstrap();

  constructor() {
    dotenv.config();
    this.appBootstrap.expressAppDefinition(this.express);
    const appConfig = new AppConfiguration();
    appConfig.configure(this);
  }

  get Express(): express.Application {
    return this.express;
  }

  public configure(configurations: Configuration): void {
    this.configurations.push(configurations);
  }

  public bootstrap() {
    const appConfig = new AppConfiguration();
    this.logger.log('Configuring Express Options');
    appConfig.configure(this);
    this.configurations.forEach(conf => conf.configure(this));
    return this.express;
  }
}
