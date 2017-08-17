import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

/**
 * 400: Bad Request
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
 *
 * @export
 * @class BadRequestException
 * @extends {HttpException}
 */
export class BadRequestException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

/**
 * 401: Unauthorized
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
 *
 * @export
 * @class UnauthorizedException
 * @extends {HttpException}
 */
export class UnauthorizedException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.UNAUTHORIZED);
  }
}

/**
 * 403: Forbidden
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
 *
 * @export
 * @class ForbiddenException
 * @extends {HttpException}
 */
export class ForbiddenException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.FORBIDDEN);
  }
}

/**
 * 404: Not Found
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
 *
 * @export
 * @class NotFoundException
 * @extends {HttpException}
 */
export class NotFoundException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}

/**
 * 405: Method Not Allowed
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
 *
 * @export
 * @class NotAllowedException
 * @extends {HttpException}
 */
export class NotAllowedException extends HttpException {
  constructor(msg: string | object = 'Method Not Allowed') {
    super(msg, 405);
  }
}

/**
 * 409: Conflict
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
 *
 * @export
 * @class ConflictException
 * @extends {HttpException}
 */
export class ConflictException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.CONFLICT);
  }
}

/**
 * 410: Gone
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410
 *
 * @export
 * @class GoneException
 * @extends {HttpException}
 */
export class GoneException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.GONE);
  }
}

/**
 * 415: Unsupported Media Type
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
 *
 * @export
 * @class UnsupportedMediaException
 * @extends {HttpException}
 */
export class UnsupportedMediaException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}

/**
 * 429: Too Many Requests
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
 *
 * @export
 * @class TooManyRequestsException
 * @extends {HttpException}
 */
export class TooManyRequestsException extends HttpException {
  constructor(msg: string | object) {
    super(msg, HttpStatus.TOO_MANY_REQUESTS);
  }
}
