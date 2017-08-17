import { Module, Shared } from '@nestjs/common';

import { DatabaseExceptionFilter } from './exceptions';
import { Environments } from './environments';
import { MongooseService } from './mongoose/mongoose.service';

@Shared()
@Module({
  modules: [],
  controllers: [],
  components: [
    DatabaseExceptionFilter,
    Environments,
    MongooseService,
  ],
  exports: [
    DatabaseExceptionFilter,
    Environments,
    MongooseService,
  ],
})
export class SharedModule {}
