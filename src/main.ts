import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // const microService = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqps://rvqpjusb:xIeU0SIXUZWkd4ocDVg3X7nA1f_qpxIb@sparrow.rmq.cloudamqp.com/rvqpjusb'],
  //     queue: 'energy-queue',
  //     noAck: false,
  //     prefetchCount: 1,
  //     queueOptions: {
  //       durable: true,
  //     }
  //   },
  // });

   app.enableCors();
   //app.enableCors({origin: 'http://localhost:58645' });
  //app.useGlobalPipes(new ValidationPipe());
  //app.enableCors({origin: 'https://energyplatformfe.herokuapp.com' });

  //await microService.listen();

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();