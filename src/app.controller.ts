import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

import { DeviceService } from './device/services/device.service';
import { CreateEnergy } from './energy/models/create-energy.model';
import { EnergyService } from './energy/services/energy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private deviceService: DeviceService,
    private energyService: EnergyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('energy')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);

    const dataReceived = JSON.parse(data);
    console.log(dataReceived);

    const createEnergy: CreateEnergy = {
      consumption: dataReceived.measurement_value,
      deviceId: dataReceived.device_id,
      timestamp: dataReceived.timestamp
    };
    
    this.energyService.addEnergy(createEnergy);

    const energyForCurrentDevice = await this.deviceService.getEnergyByDevice(dataReceived.device_id as string);
    var energyCurrentDevice = +energyForCurrentDevice;

    const totalEnergy = await this.energyService.getAllEnergyForDevice(dataReceived.device_id as string);
    const str = JSON.stringify(totalEnergy);
    const matches = str.match(/\d+/g);
    var energyTotal = matches[0] as unknown as number;

    console.log("Maximum energy for current device " +energyCurrentDevice);
    console.log("Total energy for current device " +energyTotal);

    if (energyTotal > energyCurrentDevice) {
      console.log("DA");
    }
    else {
      console.log("NU");
    }
  }
  
}
