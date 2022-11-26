import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceModule } from "src/device/device.module";
import { EnergyController } from "./energy.controller";
import { Energy } from "./models/energy.entity";
import { EnergyService } from "./services/energy.service";

@Module({
    imports: [TypeOrmModule.forFeature([Energy]), DeviceModule],
    controllers: [EnergyController],
    providers: [EnergyService],
    exports: [EnergyService],
})
export class EnergyModule {}