import { IsEmpty } from "class-validator";
import { Device } from "src/device/models/device.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity({name: "user"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    @IsEmpty()
    role: Role;

    @OneToMany(() => Device, device => device.user)
    devices: Device[];
}