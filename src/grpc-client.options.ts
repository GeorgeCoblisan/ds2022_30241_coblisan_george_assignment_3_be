import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'chat',
    protoPath: join(__dirname, '../src/proto/chat.proto'),
  },
};