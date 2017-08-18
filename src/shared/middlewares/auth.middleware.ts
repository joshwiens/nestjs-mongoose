import { Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  public resolve(): (req: Request, res: Response, next: NextFunction) => void {
    const secret = jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 60,
      jwksUri: process.env.AUTH_JWKS_URL,
    });
    return jwt({
      secret: secret,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
      algorithms: ['RS256'],
    });
  }
}
