import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( 
    new ValidationPipe({ 
    //Elimina ekementos basura que no estan definidos en nuestros DTOs
    whitelist: true, 
    //Detecta error si nos envian un campo que no se definió en el DTO
    forbidNonWhitelisted: true, 
    }) 
   );

   app.setGlobalPrefix('/erp/api/v1/')
  await app.listen(3000);
}
bootstrap();
