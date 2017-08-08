import { LoggerComponent } from './logger.component';
import { WinstonComponent } from './adapters/winston.component';

import { Configurable } from '../../app/app.component';

export class LoggerConfig implements Configurable {
  public configure(): void {
    LoggerComponent.addAdapter('winston', WinstonComponent);
    LoggerComponent.setAdapter(process.env.LOG_ADAPTER);
  }
}
