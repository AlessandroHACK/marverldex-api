import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from 'src/characters/schemas/character.schema';
import { CHARACTERS_SEED } from './data/character.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>
  ){}

  async executeSeed() {
    await this.characterModel.deleteMany({});
    const characters = await this.characterModel.insertMany(CHARACTERS_SEED)
    return {intertedCount: characters.length}
  }


}
