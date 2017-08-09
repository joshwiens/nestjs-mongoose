import { HttpException } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('DemoModule', () => {
  describe('DemoService', () => {
    let service: DemoService;
    beforeEach(() => {
      Test.createTestingModule({
        components: [DemoService],
        controllers: [DemoController],
      });

      service = Test.get(DemoService);
    });

    it('sends generic demo response', async () => {
      expect(await service.sendDemoResponse()).toEqual('NestJS Demo Response');
    });

    it('sends demo response to a user', async () => {
      expect(await service.sendDemoResponseUser('goodUser')).toEqual('NestJS Demo Response to, goodUser!');
    });

    it('does not respond to badUser', async () => {
      try {
        await service.sendDemoResponseUser('badUser');
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.response).toEqual('Response not authorized');
      }
    });
  });
});
