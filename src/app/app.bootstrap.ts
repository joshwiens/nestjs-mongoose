import { Component } from '@nestjs/common';

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { Mongoose } from './../core/mongoose/mongoose.component';
import { MongooseConfig } from './../core/mongoose/mongoose.confg';

@Component()
export class AppBootstrap {
  public expressAppDefinition(app: express.Application): express.Application {
    app.set('prefix', process.env.APP_URL_PREFIX);
    app.set('host', process.env.APP_HOST);
    app.set('port', this.normalizedPort(process.env.APP_PORT || '3000'));
    app.set('key', fs.readFileSync(path.resolve(`${process.env.TLS_KEY_PATH}`)));
    app.set('cert', fs.readFileSync(path.resolve(`${process.env.TLS_CERT_PATH}`)));
    app.set('ca', fs.readFileSync(path.resolve(`${process.env.TLS_CA_PATH}`)));
    return app;
  }

  public async setupDataSources() {
    let mongooseClient;
    const mongooseConfig: MongooseConfig = new MongooseConfig();
    const mongooseInstance: Mongoose = new Mongoose();
    return mongooseClient = await mongooseInstance.getMongooseConnection(mongooseConfig.configure());
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
