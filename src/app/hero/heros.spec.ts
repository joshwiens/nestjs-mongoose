import { HttpException } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Mockgoose } from 'mockgoose';
import { Mongoose } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { HerosController } from './heros.controller';
import { HerosModel, Hero } from './heros.model';
import { HerosService } from './heros.service';


const mongoose = new Mongoose;
const mockgoose = new Mockgoose(mongoose);
const db = null;

describe('Module: HerosModule', () => {

  beforeAll(async () => {
    await mockgoose.prepareStorage();
    return this.db = mongoose.connect('mongodb://localhost/test');
  });

  afterAll(async () => {
    await mockgoose.helper.reset();
    return mongoose.disconnect();
  });

  describe('HerosService', () => {
    let service: HerosService;
    beforeEach(() => {
      Test.createTestingModule({
        modules: [SharedModule],
        components: [HerosService, HerosModel],
        controllers: [HerosController],
      });

      service = Test.get(HerosService);
    });

    it('should find Hero by ObjectId', async () => {
      const instance = new HerosModel(this.db);
      const heroRepo = instance.herosRepository();
      const hero: any = {
        _id: '5995ad20f40431031cd799df',
        name: 'Superman',
        alignment: 'Good',
      };
      await heroRepo.create(hero);

      const result = await heroRepo.findById('5995ad20f40431031cd799df');

      expect(JSON.parse(JSON.stringify(result))).toMatchObject(hero);
    });

  });
});
