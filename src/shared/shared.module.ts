import { MiddlewaresConsumer, Module, RequestMethod, Shared } from '@nestjs/common';

import { Environments } from './environments';
import { DatabaseExceptionFilter } from './exceptions';
import { RestLoggerMiddleware, AuthMiddleware } from './middlewares';
import { MongooseService } from './mongoose/mongoose.service';

@Shared()
@Module({
  modules: [],
  controllers: [],
  components: [AuthMiddleware, DatabaseExceptionFilter, RestLoggerMiddleware, Environments, MongooseService],
  exports: [AuthMiddleware, DatabaseExceptionFilter, RestLoggerMiddleware, Environments, MongooseService],
})
export class SharedModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(RestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
