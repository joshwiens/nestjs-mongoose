import { Module } from '@nestjs/common';

import { Environment } from './config/environment.component';
import { Mongoose } from './mongoose/mongoose.component';
import { MongooseConfig } from './mongoose/mongoose.confg';

@Module({
  modules: [],
  controllers: [],
  components: [Environment, MongooseConfig, Mongoose],
  exports: [Environment, MongooseConfig, Mongoose],
})
export class CoreModule {}
