import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { CreateEnergy } from "./energy/models/create-energy.model";

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationGateway {
    @WebSocketServer() server;

    async notifyUser(createEnergy: CreateEnergy) {
        this.server.emit('notification', createEnergy);
    }

    async sendData(createEnergy: CreateEnergy) {
        this.server.emit('data', createEnergy);
    }
}