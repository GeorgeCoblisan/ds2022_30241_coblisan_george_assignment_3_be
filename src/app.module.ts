import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { EnergyModule } from './energy/energy.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => 
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConfigModule.forRoot(),
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
  providers: [AppService],
})
export class AppModule {}
