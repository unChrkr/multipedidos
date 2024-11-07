import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors'; 

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({
    origin: 'http://localhost:3001',
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running at port ${process.env.PORT ?? 3000}`);
}

bootstrap();
