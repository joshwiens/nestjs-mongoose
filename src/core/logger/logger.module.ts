import { Module } from '@nestjs/common';

import { WinstonComponent } from './adapters/winston.component';
import { LoggerComponent } from './logger.component';

@Module({
  modules: [],
  controllers: [],
  components: [
    LoggerComponent,
    WinstonComponent
  ],
  exports: [
    LoggerComponent
  ],
})
export class LoggerModule {}
