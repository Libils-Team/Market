import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http.exception';
import { CustomResponse } from './interceptors/cusomResponse.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup('api/v1/docs', app, createDocument(app));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new CustomResponse());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
