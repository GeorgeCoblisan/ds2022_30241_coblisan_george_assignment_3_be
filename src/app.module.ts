import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { EnergyModule } from './energy/energy.module';
import { UserModule } from './users/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    //LOCAL

    TypeOrmModule.forRootAsync({
      useFactory: async () => 
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),

    //DOCKER

    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "postgres",
    //   username: "postgres",
    //   password: "george",
    //   port: 5432,
    //   database: "EnergyUtility",
    //   entities: ["dist/**/*.entity{.ts,.js}"],
    //   synchronize: true,
    //   autoLoadEntities: true
    // }),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),

    //HEROKU

    // TypeOrmModule.forRoot({
    //   url: process.env.DATABASE_URL,
    //   type: "postgres",
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   synchronize: true,
    //   entities: ["dist/**/*.entity{.ts,.js}"],
    //   autoLoadEntities: true,
    // }),
    UserModule,
    DeviceModule,
    EnergyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    NotificationGateway
  ],
})
export class AppModule {}
