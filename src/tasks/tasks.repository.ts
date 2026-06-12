import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ITasksRepository, ITaskWithUser, ITask } from './interfaces/tasks.interface';

@Injectable()
export class TasksRepository implements ITasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { title: string; description?: string; completed?: boolean; userId: string }): Promise<ITask> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed ?? false,
        userId: data.userId,
      },
    });
  }

  findByUserId(userId: string): Promise<ITask[]> {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll(): Promise<ITaskWithUser[]> {
    return this.prisma.task.findMany({
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string): Promise<ITaskWithUser | null> {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
      },
    });
  }

  update(id: string, data: { title?: string; description?: string; completed?: boolean }): Promise<ITask> {
    return this.prisma.task.update({ where: { id }, data });
  }

  remove(id: string): Promise<ITask> {
    return this.prisma.task.delete({ where: { id } });
  }
}
