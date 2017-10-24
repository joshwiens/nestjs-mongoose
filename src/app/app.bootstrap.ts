import { Component } from '@nestjs/common';

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { Environments } from '../shared/environments';

@Component()
export class AppBootstrap {
  private isProd: any = false;
  public expressAppDefinition(app: express.Application): express.Application {
    app.set('prefix', process.env.APP_URL_PREFIX);
    app.set('host', process.env.APP_HOST);
    app.set('port', this.normalizedPort(process.env.APP_PORT || '3000'));
    app.set('key', fs.readFileSync(path.resolve(`${process.env.TLS_KEY_PATH}`)));
    app.set('cert', fs.readFileSync(path.resolve(`${process.env.TLS_CERT_PATH}`)));
    this.isProd = Environments.isProd() ? app.set('ca', fs.readFileSync(path.resolve(`${process.env.TLS_CA_PATH}`))) : true;
    return app;
  }

  public normalizedPort(port: string): number | string {
    const portAsNumber = parseInt(port, 10);
    if (isNaN(portAsNumber)) {
      return port;
    }
    if (portAsNumber >= 0) {
      return portAsNumber;
    }
    return;
  }
}
