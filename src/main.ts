import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('LocalHands API')
    .setDescription('The LocalHands API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This name here is important for references
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    compression({
      threshold: 100,
      filter(req, res) {
        if (req.headers['x-disable-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
