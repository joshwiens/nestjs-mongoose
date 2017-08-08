import * as winston from 'winston';

import { Environment } from '../../config/environment';

export class WinstonComponent {
  private logger: winston.LoggerInstance;

  constructor(private scope: string) {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          colorize: !Environment.isProd(),
          handleExceptions: Environment.isProd(),
          json: Environment.isProd(),
          level: process.env.LOG_LEVEL,
          timestamp: Environment.isProd(),
        }),
      ],
      exitOnError: false,
    });
  }

  public info(logMessage: string, ...args: any[]): void {
    this.logger.info(` ${this.setScope()} ${logMessage}`, this.setArgs(args));
  }

  public warn(logMessage: string, ...args: any[]): void {
    this.logger.warn(` ${this.setScope()} ${logMessage}`, this.setArgs(args));
  }

  public error(logMessage: string, ...args: any[]): void {
    this.logger.error(`${this.setScope()} ${logMessage}`, this.setArgs(args));
  }

  public debug(logMessage: string, ...args: any[]): void {
    this.logger.debug(`${this.setScope()} ${logMessage}`, this.setArgs(args));
  }

  private setArgs(args: any[]): any {
    return args && args[0] && args[0].length > 0 ? args : '';
  }

  private setScope(): string {
    return `[${this.scope}] => `;
  }
}
