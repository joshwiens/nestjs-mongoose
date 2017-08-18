import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as https from 'https';

import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { Environments } from './shared/environments';
import { DatabaseExceptionFilter, AuthExceptionFilter } from './shared/exceptions';


const logger = new Logger('HttpsServer');
const appInstance = new AppComponent();
const app = appInstance.bootstrap();

const server = NestFactory.create(AppModule, app);
server.setGlobalPrefix(app.get('prefix'));
server.useGlobalFilters(new AuthExceptionFilter());
server.useGlobalFilters(new DatabaseExceptionFilter());
server.init();

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
