import { Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from 'express-jwt';

interface AuthErrorMessage {
  message: string;
  status: number;
}

@Catch(Error)
export class AuthExceptionFilter implements ExceptionFilter {
  private logger = new Logger(AuthExceptionFilter.name);
  private readonly EXPIRED_ERROR = 'TokenExpiredError';
  private readonly TOKEN_ERROR = 'JsonWebTokenError';

  public catch(exception, response) {
    this.logErrorMessage(exception);
    let errorMessage: AuthErrorMessage = {
      message: 'Authorization Exception',
      status: HttpStatus.UNAUTHORIZED,
    };

    if (exception instanceof JsonWebTokenError || TokenExpiredError || NotBeforeError || UnauthorizedError) {
      errorMessage = this.jwtParseError(exception);
    }

    response.status(errorMessage.status).json({ message: errorMessage.message });
  }

  private jwtParseError(exception): AuthErrorMessage {
    const errorMessage: AuthErrorMessage = {
      message: 'Authorization Exception',
      status: HttpStatus.UNAUTHORIZED,
    };
    switch (exception.name) {
      case this.EXPIRED_ERROR: {
        errorMessage.message = exception.message;
        errorMessage.status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case this.TOKEN_ERROR: {
        errorMessage.message = exception.message;
        errorMessage.status = HttpStatus.UNAUTHORIZED;
        break;
      }
    }

    return errorMessage;
  }

  private logErrorMessage(exception) {
    let errorMessage = '';
    Reflect.ownKeys(exception).forEach(k => {
      errorMessage += `${k}: ${exception[k]}/n`;
    });

    this.logger.log(errorMessage);
  }
}
