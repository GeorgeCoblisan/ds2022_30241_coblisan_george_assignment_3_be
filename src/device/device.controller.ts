import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateDevice } from "./models/create-device.model";
import { Device } from "./models/device.entity";
import { DeviceService } from "./services/device.service";



@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) {}

    @Get()
    async getDevices(): Promise<Device[]> {
        return await this.deviceService.getDevices();
    }

    @Get(':userId')
    async getDeviceByUser(@Param('userId') userId: string): Promise<Device[]> {
        return this.deviceService.getDevicesByUser(userId);
    }

    @Post()
    async createDevice(@Body() createDevice: CreateDevice): Promise<Device> {
        return this.deviceService.createDevice(createDevice);
    }

    @Patch('device/:deviceId/user/:userId')
    async editDevice(@Param('deviceId') deviceId: string, @Param('userId') userId: string) {
        return this.deviceService.associateUserToDevice(deviceId, userId);
    }
}