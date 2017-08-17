import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res
  } from '@nestjs/common';
import { Response } from 'express';

import { NotFoundException } from '../../shared/exceptions';

import { Hero } from './heros.model';
import { HerosService } from './heros.service';

@Controller('heros')
export class HerosController {
  constructor(private herosService: HerosService) {}

  @Get()
  public async getAll(@Res() res: Response) {
    const heros = await this.herosService.findAll();
    res.status(HttpStatus.OK).json(heros);
  }

  @Get(':id')
  public async getById(@Res() res: Response, @Param('id') heroId: string) {
    const hero = await this.herosService.findById(heroId);
    res.status(HttpStatus.OK).json(hero);
  }

  @Post()
  public async create(@Res() res: Response, @Body() hero: Hero) {
    const newHero = await this.herosService.create(hero);
    res.status(HttpStatus.OK).json(newHero);
  }

  @Delete(':id')
  public async delete(@Res() res: Response, @Param('id') heroId: string) {
    const hero = await this.herosService.delete(heroId);
    if (hero) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException('');
    }
  }
}
