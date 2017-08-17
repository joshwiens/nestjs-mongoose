import { Logger } from '@nestjs/common';
import { Component } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as express from 'express';

import { AppBootstrap } from './app.bootstrap';
import { AppConfiguration } from './app.config';

export interface Configuration {
  configure(app: AppComponent): void;
}

@Component()
export class AppComponent {
  private readonly logger = new Logger(AppComponent.name);
  private express: express.Application = express();
  private appBootstrap = new AppBootstrap();
  private appConfig = new AppConfiguration();

  constructor() {
    dotenv.config();
  }

  public bootstrap() {
    this.logger.log('Configuring Express Options');
    this.appBootstrap.expressAppDefinition(this.express);
    this.appConfig.configure(this.express);
    return this.express;
  }
}
