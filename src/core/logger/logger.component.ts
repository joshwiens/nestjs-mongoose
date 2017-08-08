import * as path from 'path';

export interface Adapter {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export interface AdapterConstructor {
  new (scope: string): Adapter;
}

export class LoggerComponent {
  public static DEFAULT_SCOPE = 'app';

  public static addAdapter(key: string, adapter: AdapterConstructor): void {
    LoggerComponent.Adapters.set(key, adapter);
  }

  public static setAdapter(key: string): void {
    const adapter = LoggerComponent.Adapters.get(key);
    if (adapter !== undefined) {
      LoggerComponent.Adapter = adapter;
    } else {
      console.log(`No log adapter with key ${key} was found!`);
    }
  }

  private static Adapter: AdapterConstructor;
  private static Adapters: Map<string, AdapterConstructor> = new Map();

  private static parseScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(path.sep, ':');
    }
    return filepath;
  }

  private scope: string;
  private adapter: Adapter;

  constructor(scope?: string) {
    this.scope = LoggerComponent.parseScope(scope ? scope : LoggerComponent.DEFAULT_SCOPE);
  }

  public getAdapter(): Adapter {
    return this.adapter;
  }

  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log('info', message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log('error', message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    if (this.adapter) {
      this.adapter[level](message, args);
    } else if (!this.adapter) {
      if (LoggerComponent.Adapter) {
        this.adapter = new LoggerComponent.Adapter(this.scope);
      } else {
        console.error('No adapter defined in `logger.config.ts`!');
      }
    }
  }

}
