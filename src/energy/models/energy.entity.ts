import { Device } from "src/devices/models/device.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "energy"})
export class Energy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    timestamp: string;

    @Column()
    energyConsumption: string;

    @ManyToOne(() => Device, device => device.energy, { cascade: true })
    @JoinColumn({ name: 'deviceId' })
    device: Device;
}