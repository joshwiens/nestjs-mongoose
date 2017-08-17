import { MiddlewaresConsumer, Module, RequestMethod, Shared } from '@nestjs/common';

import { Environments } from './environments';
import { DatabaseExceptionFilter } from './exceptions';
import { RestLoggerMiddleware } from './middlewares';
import { MongooseService } from './mongoose/mongoose.service';


@Shared()
@Module({
  modules: [],
  controllers: [],
  components: [DatabaseExceptionFilter, RestLoggerMiddleware, Environments, MongooseService],
  exports: [DatabaseExceptionFilter, RestLoggerMiddleware, Environments, MongooseService],
})
export class SharedModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(RestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
