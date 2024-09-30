import { NestFactory } from '@nestjs/core';
import { TaskModule } from './TaskModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://tasks-fe.vercel.app',
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
  });
  await app.listen(3000);
}

bootstrap();
