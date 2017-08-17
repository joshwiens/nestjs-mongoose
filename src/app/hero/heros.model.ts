import { Component } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { DocumentQuery, Schema } from 'mongoose';

import { MongooseService } from './../../shared/mongoose/mongoose.service';

export interface Hero extends Document {
  id?: string;
  name: string;
  alignment: string;
}

export interface HeroModel extends Model<Hero> {
  findByName(name: string): DocumentQuery<Hero[], Hero>;
  findByAlignment(alignment: string): DocumentQuery<Hero[], Hero>;
}

@Component()
export class HerosModel {
  private model: HeroModel;
  private schema: Schema;
  private readonly collection = 'heros';

  constructor(private mongooseService: MongooseService) {
    this.verifySchema();
    this.addStatics();
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
      name: { type: String, required: 'Name field is requied' },
      alignment: { type: String, index: true },
    });
  }

  /**
   * Binds custom static methods to the schema
   *
   * @private
   * @memberof HerosModel
   */
  private addStatics() {
    this.schema.static('findByName', this.findByName.bind(this));
    this.schema.static('findByAlignment', this.findByAlignment.bind(this));
  }

  /**
   * Fake static methods for demo purposes ( must be bound above )
   *
   * @private
   * @param {string} name
   * @returns {DocumentQuery<Hero[], Hero>}
   * @memberof HerosModel
   */
  private findByName(name: string): DocumentQuery<Hero[], Hero> {
    return this.model.find({ name: name });
  }

  private findByAlignment(alignment: string): DocumentQuery<Hero[], Hero> {
    return this.model.find({ alignment: alignment });
  }

}
