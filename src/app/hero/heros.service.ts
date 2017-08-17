import { Component } from '@nestjs/common';

import { Hero, HerosModel } from './heros.model';

@Component()
export class HerosService {
  constructor(private herosModel: HerosModel) {}

  public async findAll(): Promise<Hero[]> {
    return await this.repository.find();
  }

  public async findById(id: string): Promise<Hero> {
    return await this.repository.findById(id);
  }

  public async findByName(name: string): Promise<Hero[]> {
    return await this.repository.findByName(name);
  }

  public async findByAlignment(alignment: string): Promise<Hero[]> {
    return await this.repository.findByAlignment(alignment);
  }

  public async create(name: Hero) {
    const newHero = await this.repository.create(name);
    return newHero;
  }

  public async delete(id: string) {
    return this.repository.findByIdAndRemove(id);
  }

  private get repository() {
    return this.herosModel.herosRepository();
  }
}
