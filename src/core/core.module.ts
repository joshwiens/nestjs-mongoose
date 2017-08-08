import { Module } from '@nestjs/common';

import { Environment } from './config/environment';
import { LoggerModule } from './logger/logger.module';

@Module({
  modules: [
    LoggerModule
  ],
  controllers: [],
  components: [Environment],
  exports: [],
})
export class CoreModule {}
