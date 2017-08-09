import { Module } from '@nestjs/common';

import { Environment } from './config/environment';

@Module({
  modules: [],
  controllers: [],
  components: [Environment],
  exports: [Environment],
})
export class CoreModule {}
