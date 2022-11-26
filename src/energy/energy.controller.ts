import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEnergy } from './models/create-energy.model';
import { Energy } from './models/energy.entity';
import { EnergyService } from './services/energy.service';

@Controller('energy')
export class EnergyController {
    constructor(private energyService: EnergyService) {}

    @Get()
    async getEnergy(): Promise<Energy[]> {
        return await this.energyService.getEnergy();
    }
    
    @Get(':deviceId')
    async getEnergyByDevice(@Param('deviceId') deviceId: string): Promise<Energy[]> {
        return this.energyService.getEnergyByDevice(deviceId);
    } 

    @Post()
    async createEnergy(@Body() createEnergy: CreateEnergy): Promise<Energy> {
        return this.energyService.createEnergy(createEnergy);
    }
}
