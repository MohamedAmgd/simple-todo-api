import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) { }

  async todo(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where: { id: id } });
  }

  async todos(userid: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({ where: { authorId: userid } });
  }

  async createTodo(createTodoDto: CreateTodoDto, userid: number): Promise<Todo> {
    return this.prisma.todo.create({ data: { authorId: userid, ...createTodoDto }, });
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      return await this.prisma.todo.update({ data: updateTodoDto, where: { id: id } });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException()
      }
    }
  }

  async deleteTodo(id: number): Promise<Todo> {
    try {
      return await this.prisma.todo.delete({ where: { id: id } });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException()
      }
    }
  }
}