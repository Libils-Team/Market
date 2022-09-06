import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDto } from './dto/role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(rolePayload: RoleDto): Promise<Role> {
    const candidate = await this.findByValue(rolePayload.value);
    if (candidate) {
      throw new BadRequestException({ message: 'Роль уже существует' });
    }
    const role = await this.roleRepository.create(rolePayload);
    return role;
  }

  async findByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
