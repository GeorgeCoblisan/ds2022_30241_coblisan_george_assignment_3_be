import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceController } from "./device.controller";

import { Device } from "./models/device.entity";
import { DeviceService } from "./services/device.service";


@Module({
    imports: [TypeOrmModule.forFeature([Device])],
    controllers: [DeviceController],
    providers: [DeviceService],
    exports: [DeviceService],
})
export class DeviceModule {}