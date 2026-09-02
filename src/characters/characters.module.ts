import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
  imports: [MongooseModule.forFeature([
    {name: Character.name, schema: CharacterSchema}
  ])],
  exports: [ MongooseModule ]
})
export class CharactersModule {}
