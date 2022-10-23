import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { User } from './models/user.entity';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get('/email/:email/password/:password')
    async getUserAfterLogin(@Param('email') email: string, @Param('password') password: string): Promise<User> {
        const user: User = await this.userService.getUserAfterLogin(email, password);
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Delete(':userId')
    deleteUser(@Param('userId') userId: string): Promise<User> {
        return this.userService.deleteUser(userId);
    }

    @Patch(':userId')
    editUser(@Param('userId') userId: string, @Body() user: CreateUserDto): Promise<User> {
        return this.userService.editUser(userId, user);
    }
}
