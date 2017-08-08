import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';

import { AppComponent } from './app.component';


@Module({
  modules: [
    CoreModule
  ],
  controllers: [],
  components: [AppComponent],
  exports: [],
})
export class AppModule {}
