import { Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'express-jwt';

const jwksRsa = require('jwks-rsa');

import { UnauthorizedException } from '../exceptions';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  public resolve() {
    return (req: Request, res: Response, next: NextFunction) => {
      const authorizationHeaders = req.headers['authorization'] as string;
      if (!authorizationHeaders) {
        throw new UnauthorizedException('No authorization token on request');
      }
      const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: false,
          rateLimit: true,
          jwksRequestsPerMinute: 60,
          jwksUri: process.env.AUTH_JWKS_URL,
        }),
        audience: process.env.AUTH_AUDIENCE,
        issuer: process.env.AUTH_ISSUER,
        algorithms: ['RS256'],
      });
      if (!checkJwt) {
        throw new UnauthorizedException('Invalid Token');
      }
      next();
    };
  }
}
