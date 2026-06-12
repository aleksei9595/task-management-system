import { Injectable, NotFoundException, ForbiddenException, BadRequestException, Logger, Inject } from '@nestjs/common';
import { ITasksRepository } from './interfaces/tasks.interface';
import { TASKS_REPOSITORY } from '../common/constants/injection-tokens';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly taskRepository: ITasksRepository,
  ) {}

  async create(data: CreateTaskDto, userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    const task = await this.taskRepository.create({
      title: data.title,
      description: data.description,
      completed: data.completed,
      userId,
    });
    this.logger.log(`Task created: "${task.title}" by user ${userId}`);
    return task;
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  findByUser(userId: string) {
    return this.taskRepository.findByUserId(userId);
  }

  async findOne(id: string, userId: string, role: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (role !== 'ADMIN' && task.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return task;
  }

  async update(id: string, userId: string, role: string, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (role !== 'ADMIN' && task.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return this.taskRepository.update(id, data);
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const deleted = await this.taskRepository.remove(id);
    this.logger.log(`Task deleted: id=${id} "${deleted.title}"`);
    return deleted;
  }
}
