import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo deja la data que se esta esperando
      forbidNonWhitelisted: true,
      transform: true, //convierte los query/route params (siempre strings) al tipo declarado en el DTO
     transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
main();
