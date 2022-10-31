import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { Pool, Client } = require('pg')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localhost:4200'});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

var client = new Client({
  user: "postgres",
  password: "george",
  database: "EnergyUtility",
  port: 5432,
  host: "localhost",
  ssl: true
});
client.connect(function () {
  console.log("connected");
});
