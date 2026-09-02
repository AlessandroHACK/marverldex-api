import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from 'src/characters/schemas/character.schema';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CharactersModule]
})
export class SeedModule {}
  