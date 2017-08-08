import * as winston from 'winston';

import { EnvironmentComponent } from '../../config/environment.component';

export class WinstonComponent {
  private logger: winston.LoggerInstance;

  constructor(private scope: string) {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: process.env.LOG_LEVEL,
          timestamp: EnvironmentComponent.isProd(),
          handleExceptions: EnvironmentComponent.isProd(),
          json: EnvironmentComponent.isProd(),
          colorize: !EnvironmentComponent.isProd(),
        }),
      ],
      exitOnError: false,
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(`${this.formatScope()} ${message}`, this.parseArgs(args));
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(` ${this.formatScope()} ${message}`, this.parseArgs(args));
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(` ${this.formatScope()} ${message}`, this.parseArgs(args));
  }

  public error(message: string, ...args: any[]): void {
    this.logger.error(`${this.formatScope()} ${message}`, this.parseArgs(args));
  }

  private parseArgs(args: any[]): any {
    return args && args[0] && args[0].length > 0 ? args : '';
  }

  private formatScope(): string {
    return `[${this.scope}] => `;
  }
}
