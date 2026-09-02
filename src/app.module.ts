import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CharactersModule } from './characters/characters.module';
import { SeedModule } from './seed/seed.module';
import { configuration } from './config/env.config';

@Module({
  imports: [
    // Loads .env into process.env. isGlobal makes ConfigService available everywhere.
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration] //load env configuration
    }),

    // Serves static files (from the frontend build) from /public.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Global connection to MongoDB.
    // get('mongodb') reads the MONGODB var from .env (same as process.env.MONGODB).
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb'),
      }),
      inject: [ConfigService],
    }),

    CharactersModule,
    SeedModule,
  ],
})
export class AppModule {}