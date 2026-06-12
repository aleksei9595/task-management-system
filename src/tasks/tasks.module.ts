import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksRepository } from './tasks.repository';
import { TASKS_REPOSITORY } from '../common/constants/injection-tokens';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TASKS_REPOSITORY,
      useClass: TasksRepository,
    },
  ],
})
export class TasksModule {}
