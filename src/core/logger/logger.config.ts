import { LoggerComponent } from './logger.component';
import { WinstonComponent } from './adapters/winston.component';

export class LoggerConfig {
  public configure(): void {
    LoggerComponent.addAdapter('winston', WinstonComponent);
    LoggerComponent.setAdapter(process.env.LOG_ADAPTER);
  }
}
