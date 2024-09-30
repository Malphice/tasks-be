import { NestFactory } from '@nestjs/core';
import { TaskModule } from './TaskModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
  });
  await app.listen(3000);
}

bootstrap();
