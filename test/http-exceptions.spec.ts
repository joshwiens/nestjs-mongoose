import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  NotAllowedException,
  ConflictException,
  GoneException,
  UnsupportedMediaException,
  TooManyRequestsException,
} from '../src/shared/exceptions';

describe('HTTP Exceptions', () => {
  test('BAD_REQUEST: Should have the correct properties', () => {
    const exception = new BadRequestException('message');
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toBe('message');
  });

  test('UNAUTHORIZED: Should have the correct properties', () => {
    const exception = new UnauthorizedException('message');
    expect(exception.getStatus()).toBe(401);
    expect(exception.getResponse()).toBe('message');
  });

  test('FORBIDDEN: Should have the correct properties', () => {
    const exception = new ForbiddenException('message');
    expect(exception.getStatus()).toBe(403);
    expect(exception.getResponse()).toBe('message');
  });

  test('NOT_FOUND: Should have the correct properties', () => {
    const exception = new NotFoundException('message');
    expect(exception.getStatus()).toBe(404);
    expect(exception.getResponse()).toBe('message');
  });

  test('NOT_ALLOWED: Should have the correct properties', () => {
    const exception = new NotAllowedException('message');
    expect(exception.getStatus()).toBe(405);
    expect(exception.getResponse()).toBe('message');
  });

  test('CONFLICT: Should have the correct properties', () => {
    const exception = new ConflictException('message');
    expect(exception.getStatus()).toBe(409);
    expect(exception.getResponse()).toBe('message');
  });

  test('GONE: Should have the correct properties', () => {
    const exception = new GoneException('message');
    expect(exception.getStatus()).toBe(410);
    expect(exception.getResponse()).toBe('message');
  });

  test('UNSUPPORTED_MEDIA_TYPE: Should have the correct properties', () => {
    const exception = new UnsupportedMediaException('message');
    expect(exception.getStatus()).toBe(415);
    expect(exception.getResponse()).toBe('message');
  });

  test('UNSUPPORTED_MEDIA_TYPE: Should have the correct properties', () => {
    const exception = new TooManyRequestsException('message');
    expect(exception.getStatus()).toBe(429);
    expect(exception.getResponse()).toBe('message');
  });
});
