import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDevice } from '../models/create-device.model';
import { Device } from '../models/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async getDevices(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }

  async getDevicesByUser(userId: string): Promise<Device[]> {
    return await this.deviceRepository
      .createQueryBuilder('device')
      .select(
        'device.id as id, device.description as description, device.address as address, device.maximumHourEnergyConsumption as maximumHourEnergyConsumption, device.userId as userId',
      )
      .where('device.userId = :id', { id: userId })
      .getRawMany();
  }

  async createDevice(createDevice: CreateDevice): Promise<Device> {
    const device = this.deviceRepository.create(createDevice);
    await this.deviceRepository.save(device);
    return device;
  }

  async associateUserToDevice(deviceId: string, userId: string) {
    const device = await this.deviceRepository.findOneBy({
        id: deviceId,
    });
    const newDevice = device;
    newDevice.userId = userId;
    return await this.deviceRepository.save(newDevice);
  }

  async getEnergyByDevice(deviceId: string): Promise<string> {
    const device = await this.deviceRepository.findOneBy({
      id: deviceId,
    });
    return device.maximumHourEnergyConsumption;
  }
}
