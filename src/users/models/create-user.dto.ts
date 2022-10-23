import { Role } from "./role.enum";

export interface CreateUserDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role,
}