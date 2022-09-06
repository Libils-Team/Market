import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from './../roles/roles.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async create(userPayload: UserDto): Promise<User> {
    const role = await this.roleService.findByValue('User');
    const createdUser = await this.userRepository.create(userPayload);
    await createdUser.$set('roles', [role.id]);
    createdUser.roles = [role];
    return createdUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
