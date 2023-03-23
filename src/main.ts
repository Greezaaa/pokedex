import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // this line adds the prefix

  app.useGlobalPipes( // this line adds the validation Pipes globally
    new ValidationPipe({
    whitelist: true, // this line don't let the user send data that is not defined in the DTO
    forbidNonWhitelisted: true, //this line throws an error if the user sends data that is not defined in the DTO
    transform: true, // this line converts the data to the correct type  (string to number, etc)  
    transformOptions: {
      enableImplicitConversion: true, // this line converts the data to the correct type  (string to number, etc)
    }
    })
   );
  await app.listen(3001);
}
bootstrap();
