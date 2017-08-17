import { Component } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { MongooseConfig } from './mongoose.confg';

@Component()
export class MongooseService {
  private readonly logger = new Logger(MongooseService.name);

  private instance: mongoose.Connection;

  constructor() {
    (mongoose as any).Promise = global.Promise;
  }

  get connection() {
    if (this.instance) {
      return this.instance;
    } else {
      mongoose.connect(this.setConfig(), { useMongoClient: true });
      this.instance = mongoose.connection;
      this.logger.log('MongoDB Connection Established');
      return this.instance;
    }
  }

  private setConfig() {
    const mongooseConfig: MongooseConfig = new MongooseConfig();

    return mongooseConfig.configure();
  }
}
