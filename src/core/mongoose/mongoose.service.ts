import { Component } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import * as mongoose from 'mongoose';

export type MongooseClient = mongoose.Mongoose;

@Component()
export class MongooseService {
  private readonly logger = new Logger(MongooseService.name);

  public getMongooseConnection(connectionString) {
    return new Promise<MongooseClient>((resolve, reject) => {
      const connString = connectionString;
      mongoose.connect(connString, { useMongoClient: true });
      const db = mongoose.connection;

      db.on('error', (e: Error) => {
        this.logger.error('Db conenction error:' + e);
        reject(e);
      });
      db.once('open', () => {
        this.logger.log('Successful MongoDB Connection!');
        resolve(mongoose);
      });
    });
  }
}
