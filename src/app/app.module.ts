import { AppConfiguration } from './app.config';
import { AppBootstrap } from './app.bootstrap';
import { AppComponent } from './app.component';
import { HaiModule } from './hai/hai.module';
import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';

@Module({
  modules: [
    CoreModule,
    HaiModule
  ],
  controllers: [],
  components: [AppComponent, AppBootstrap, AppConfiguration],
  exports: [AppComponent, AppBootstrap, AppConfiguration],
})
export class AppModule {}
