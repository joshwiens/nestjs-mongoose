import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Component()
export class DemoService {
  public sendDemoResponse(): Promise<string> {
    return Promise.resolve('NestJS Demo Response');
  }

  public sendDemoResponseUser(name?: string): Promise<string> {
    if (name === 'badUser') {
      throw new HttpException('Response not authorized', 418);
    }

    return Promise.resolve(`NestJS Demo Response to${name && `, ${name}`}!`);
  }
}
