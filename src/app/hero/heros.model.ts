import { Component } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { DocumentQuery, Schema } from 'mongoose';

import { MongooseService } from './../../shared/mongoose/mongoose.service';

export interface Hero extends Document {
  id?: string;
  name: string;
}

export interface HeroModel extends Model<Hero> {
  findBySomething(something: string): DocumentQuery<Hero[], Hero>;
}

@Component()
export class HerosModel {
  private model: HeroModel;
  private schema: Schema;
  private readonly collection = 'heros';

  constructor(private mongooseService: MongooseService) {
    this.verifySchema();
    this.addSelectors();
    this.herosRepository();
  }

  public herosRepository() {
    const models = this.mongooseService.connection.modelNames();
    if (models.includes(this.collection)) {
      this.model = this.mongooseService.connection.model(this.collection) as HeroModel;
    } else {
      this.model = this.mongooseService.connection.model(this.collection, this.schema) as HeroModel;
    }
    return this.model;
  }

  private verifySchema() {
    this.schema = new Schema({
      name: { type: String, required: 'Field {PATH} is required' },
    });
  }

  /**
   * Binds custom selectors to the schema
   *
   * @private
   * @memberof HerosModel
   */
  private addSelectors() {
    this.schema.static('findBySomething', this.findBySomething.bind(this));
  }

  /**
   * Fake selector for demo purposes ( must be bound above )
   *
   * @private
   * @param {string} something
   * @returns {DocumentQuery<Hero[], Hero>}
   * @memberof HerosModel
   */
  private findBySomething(something: string): DocumentQuery<Hero[], Hero> {
    return this.model.find({ someProp: something });
  }
}
