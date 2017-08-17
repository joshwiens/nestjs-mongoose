import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

import { HerosController } from './heros.controller';
import { HerosModel } from './heros.model';
import { HerosService } from './heros.service';

@Module({
  components: [HerosService, HerosModel],
  controllers: [HerosController],
  modules: [SharedModule],
  exports: [HerosService, HerosModel],
})
export class HerosModule {}
