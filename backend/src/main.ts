import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { env } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS para permitir requisições do frontend
  app.enableCors();

  await app.listen(env.PORT, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
}

bootstrap();
