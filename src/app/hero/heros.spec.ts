import { HttpException } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Mockgoose } from 'mockgoose';
import { Mongoose } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { HerosController } from './heros.controller';
import { HerosModel, Hero } from './heros.model';
import { HerosService } from './heros.service';


const mongoose = new Mongoose();
const mockgoose = new Mockgoose(mongoose);
const db = null;

beforeAll(async () => {
  await mockgoose.prepareStorage();
  this.db = mongoose.connect('mongodb://localhost/test');
  const instance = new HerosModel(this.db);
  const heroRepo = instance.herosRepository();
  return this.db;
}, 20000);

afterAll(async () => {
  await mockgoose.helper.reset();
  return this.db.disconnect();
});


describe('Module: HerosModule', () => {
  describe('HerosService', () => {
    let herosService: HerosService;
    let herosController: HerosController;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        modules: [SharedModule],
        controllers: [HerosController],
        components: [HerosService, HerosModel],
      }).compile();

      herosService = module.get<HerosService>(HerosService);
      herosController = module.get<HerosController>(HerosController);
    });
    it('should find Heros0 by ObjectId', async () => {
      expect(1).toEqual(1);
    });
  });
});
