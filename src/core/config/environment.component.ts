export class EnvironmentComponent {
  public static getEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  public static isTest(): boolean {
    return this.getEnv() === 'test';
  }

  public static isDev(): boolean {
    return this.getEnv() === 'development';
  }

  public static isProd(): boolean {
    return this.getEnv() === 'production';
  }

  public static isEnabled(bool: string): boolean {
    try {
      return bool.toLowerCase() === 'true';
    } catch (e) {
      return false;
    }
  }
}
