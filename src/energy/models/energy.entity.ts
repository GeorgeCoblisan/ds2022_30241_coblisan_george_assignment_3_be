import { Device } from "src/device/models/device.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "energy"})
export class Energy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    timestamp: string;

    @Column()
    consumption: string;

    @Column({ nullable: true })
    deviceId: string;

    @ManyToOne(() => Device, device => device.energy, { cascade: true, onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'deviceId' })
    device: Device;
}