import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        return { username: user.username, id: user.id }
    }

    async login(user: User) {
        const payload = { username: user.username, userid: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
}