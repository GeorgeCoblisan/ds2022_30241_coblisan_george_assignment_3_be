import { Energy } from "src/energy/models/energy.entity";
import { User } from "src/users/models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "device"})
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    maximumHourEnergyConsumption: string;

    @Column({ nullable: true })
    userId: string;

    @ManyToOne(() => User, user => user.devices, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Energy, energy => energy.device, { onUpdate: 'CASCADE' })
    energy: Energy[];
}