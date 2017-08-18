import { Environments } from './environments';

describe('Environment', () => {
  test('getName() should return the test env', () => {
    expect(Environments.getEnv()).toBe('test');
  });

  test('isTest() should be true', () => {
    expect(Environments.isTest()).toBeTruthy();
  });

  test('isDevelopment() should be false', () => {
    expect(Environments.isDev()).toBeFalsy();
  });

  test('isProduction() should be false', () => {
    expect(Environments.isProd()).toBeFalsy();
  });
});
