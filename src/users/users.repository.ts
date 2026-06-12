import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUsersRepository, IUserWithTasks, IUser } from './interfaces/users.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<IUserWithTasks[]> {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  }

  findById(id: string): Promise<IUserWithTasks | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(data: { email: string; password: string; role: string }): Promise<IUser> {
    return this.prisma.user.create({ data });
  }

  update(id: string, data: Partial<{ email: string; password: string; role: string }>): Promise<IUser> {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string): Promise<IUser> {
    return this.prisma.user.delete({ where: { id } });
  }
}
