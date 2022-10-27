import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEnergy } from "../models/create-energy.model";
import { Energy } from "../models/energy.entity";

@Injectable()
export class EnergyService {
    constructor(
        @InjectRepository(Energy)
        private energyRepository: Repository<Energy>,
    ) {}

    async getEnergy(): Promise<Energy[]> {
        return await this.energyRepository.find();
    }

    async getEnergyByDevice(deviceId: string): Promise<Energy[]> {
        return await this.energyRepository
            .createQueryBuilder('energy')
            .select(
                'energy.id as id, energy.timestamp as timestamp, energy.consumption as consumption, energy.deviceId as deviceId'
            )
            .where('energy.deviceId = :id', { id: deviceId })
            .getRawMany();
    }

    async createEnergy(createEnergy: CreateEnergy) {
        const energy = this.energyRepository.create({
            timestamp: Date.now().toString(),
            consumption: createEnergy.consumption,
            deviceId: createEnergy.deviceId,
        });
        await this.energyRepository.save(energy);
        return energy;
    }
}