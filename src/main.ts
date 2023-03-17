import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';
import config, { Env } from './config';

const { NODE_ENV, PORT } = config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cors());

  if (NODE_ENV !== Env.PROD) {
    const options = new DocumentBuilder()
      .setTitle('Cars example')
      .setDescription('The cars API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    if (NODE_ENV !== Env.PROD) {
      console.log(`Swagger is running on http://localhost:${PORT}/api`);
    }
  });
}

bootstrap();
