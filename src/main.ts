import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT ?? 3001;
  if (port) {
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
  await app.listen(port);
}
bootstrap();
