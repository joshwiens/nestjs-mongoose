import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as https from 'https';

import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { Environments } from './shared/environments';
import { DatabaseExceptionFilter, AuthExceptionFilter } from './shared/exceptions';


const logger = new Logger('HttpsServer');
const appInstance = new AppComponent();
const app = appInstance.bootstrap();

async function bootstrap() {
  const server = await NestFactory.create(AppModule, app);
  server.connectMicroservice({
    transport: Transport.REDIS,
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
  server.setGlobalPrefix(app.get('prefix'));
  server.useGlobalFilters(new AuthExceptionFilter());
  server.useGlobalFilters(new DatabaseExceptionFilter());
  server.init();
  await server.startAllMicroservicesAsync();
}

bootstrap();

const options = {
  key: app.get('key'),
  cert: app.get('cert'),
  ca: app.get('ca'),
};

const httpsInstance = https.createServer(options, app).listen(app.get('port'));
httpsInstance.on('listening', () => {
  logger.log('');
  logger.log('');
  logger.log(`Nest Server ready and running on ${app.get('host')}:${app.get('port')}${app.get('prefix')}`);
  logger.log(``);
  logger.log(`-------------------------------------------------------`);
  logger.log(`Environment  : ${Environments.getEnv()}`);
  logger.log(`Version      : ${Environments.getPackageInfo().version}`);
  logger.log(``);
  logger.log(`-------------------------------------------------------`);
  logger.log(``);
});
