import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnergyController } from "./energy.controller";
import { Energy } from "./models/energy.entity";
import { EnergyService } from "./services/energy.service";

@Module({
    imports: [TypeOrmModule.forFeature([Energy])],
    controllers: [EnergyController],
    providers: [EnergyService],
    exports: [EnergyService],
})
export class EnergyModule {}