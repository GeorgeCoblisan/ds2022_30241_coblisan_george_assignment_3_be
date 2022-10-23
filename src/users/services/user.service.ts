import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../models/create-user.dto";
import { Role } from "../models/role.enum";
import { User } from "../models/user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserAfterLogin(email: string, password: string): Promise<User> {
        return this.userRepository.findOneBy({
            email: email,
            password: password,
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: createUserDto.password,
            role: Role.CLIENT,
        });
        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(userId: string): Promise<User> {
        const user = await this.userRepository.findOneBy({
            id: userId,
        })
        await this.userRepository.remove(user);
        return user;
    }

    async editUser(userId: string, userBody: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({
            id: userId,
        })
        const newUser = { id: userId, role: Role.CLIENT, ...userBody };
        await this.userRepository.remove(user);
        return await this.userRepository.save(newUser);
    }
}