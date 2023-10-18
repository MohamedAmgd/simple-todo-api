import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Prisma } from '@prisma/client';

export type User = any;

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findOne(
        username: string,
    ): Promise<User | null> {

        return this.prisma.user.findUnique({
            where: { username: username },
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({
                data: createUserDto,
            });
        } catch (err: any) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new ConflictException("This Username already exists")
                }
            }
        }
    }
}