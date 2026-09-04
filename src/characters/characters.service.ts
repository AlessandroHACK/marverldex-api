import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { isValidObjectId, Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Character, CharacterDocument } from './schemas/character.schema';
import { slugify } from '../common/helpers/slugify.helper';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CharactersService {

  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    private readonly configService: ConfigService //add config services .env
  ) { }

  async create(createCharacterDto: CreateCharacterDto) {

    try {
      const character = await this.characterModel.create(createCharacterDto);
      return character;
    } catch (error) {

      this.handleExceptions(error);
    }

  }

  async findAll(paginationDto : PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto
    const characters = await this.characterModel.find().limit( limit ).skip( offset );
    return characters;
  }

  async findOne(term: string) {
    //read id, no, name to seach the spesific character
    let character: CharacterDocument | null = null;

    //no
    if (!isNaN(+term)) {
      character = await this.characterModel.findOne({ no: +term });
    }

    //mongoId
    if (!character && isValidObjectId(term)) {
      character = await this.characterModel.findById(term)
    }

    //slug
    if (!character) {
      character = await this.characterModel.findOne({ slug: slugify(term) });
    }

    if (!character) throw new NotFoundException(`The character doesn't exist.`)

    return character;
  }

  async update(term: string, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(term);
    try {
      Object.assign(character, updateCharacterDto);
      await character.save()
      return character;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.characterModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`The character with id: ${id} doesn't exist.`);
    }
    return;
  }



  //error handling method
  private handleExceptions(error: any) {
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new BadRequestException(`The character already exists ${JSON.stringify(error.keyValue)}`)
    }

    console.log(error)
    throw new InternalServerErrorException(` Check server logs`)
  }
}
