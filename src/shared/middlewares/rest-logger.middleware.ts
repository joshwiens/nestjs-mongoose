import { Logger, Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as chalk from 'chalk';

@Middleware()
export class RestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Request');
  public resolve() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.logger.log(
        `[${chalk.white(req.method)}] ${chalk.cyan(res.statusCode.toString())} ` +
        `${chalk.white('|')} ${chalk.cyan(req.httpVersion)} ${chalk.white('|')} ${chalk.cyan(req.ip)} ` +
        `[${chalk.white('route:', req.path)}]`);
      next();
    };
  }
}
