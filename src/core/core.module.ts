import { Module } from '@nestjs/common';

import { Environment } from './config/environment.component';
import { MongooseService } from './mongoose/mongoose.service';
import { MongooseConfig } from './mongoose/mongoose.confg';

@Module({
  modules: [],
  controllers: [],
  components: [Environment, MongooseConfig, MongooseService],
  exports: [Environment, MongooseConfig, MongooseService],
})
export class CoreModule {}
