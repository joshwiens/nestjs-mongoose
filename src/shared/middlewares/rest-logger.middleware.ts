import { Logger, Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as chalk from 'chalk';

@Middleware()
export class RestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(RestLoggerMiddleware.name);
  public resolve() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.logger.log(`[${chalk.white(req.method)}] ${req.url} - ${chalk.blue(res.statusCode.toString())}`);
      next();
    };
  }
}
