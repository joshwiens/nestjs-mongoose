import { Module, Shared } from '@nestjs/common';

import { Environments } from './environments';
import { MongooseService } from './mongoose/mongoose.service';

@Shared()
@Module({
  modules: [],
  controllers: [],
  components: [Environments, MongooseService],
  exports: [Environments, MongooseService],
})
export class SharedModule {}
