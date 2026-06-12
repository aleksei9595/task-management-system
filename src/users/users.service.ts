import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, IUserWithTasks, UserPublic, IUser } from './interfaces/users.interface';
import { USERS_REPOSITORY } from '../common/constants/injection-tokens';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(data: { email: string; password: string; role?: string }): Promise<UserPublic> {
    const user = await this.userRepository.create({
      email: data.email,
      password: data.password,
      role: data.role || 'USER',
    });
    const { password: _, ...result } = user;
    return result;
  }

  async findAll(): Promise<Omit<IUserWithTasks, 'password'>[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password: _, ...u }) => u);
  }

  async findOne(id: string): Promise<Omit<IUserWithTasks, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    const { password: _, ...result } = user;
    return result;
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, data: UpdateUserDto): Promise<IUser> {
    return this.userRepository.update(id, data);
  }

  remove(id: string): Promise<IUser> {
    return this.userRepository.remove(id);
  }
}
