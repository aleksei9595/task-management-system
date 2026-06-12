import { ITask } from '../../tasks/interfaces/tasks.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export type UserPublic = Omit<IUser, 'password'>;

export interface IUserWithTasks extends IUser {
  tasks?: ITask[];
}

export interface IUsersRepository {
  findAll(): Promise<IUserWithTasks[]>;
  findById(id: string): Promise<IUserWithTasks | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: { email: string; password: string; role: string }): Promise<IUser>;
  update(id: string, data: Partial<{ email: string; password: string; role: string }>): Promise<IUser>;
  remove(id: string): Promise<IUser>;
}
