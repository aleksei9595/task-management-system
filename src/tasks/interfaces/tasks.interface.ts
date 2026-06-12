export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface ITaskWithUser extends ITask {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ITasksRepository {
  create(data: { title: string; description?: string; completed?: boolean; userId: string }): Promise<ITask>;
  findAll(): Promise<ITaskWithUser[]>;
  findByUserId(userId: string): Promise<ITask[]>;
  findOne(id: string): Promise<ITaskWithUser | null>;
  update(id: string, data: { title?: string; description?: string; completed?: boolean }): Promise<ITask>;
  remove(id: string): Promise<ITask>;
}
