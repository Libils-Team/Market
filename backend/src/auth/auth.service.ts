import { User } from './../user/user.model';
import { UserService } from './../user/user.service';
import { UserDto } from './../user/dto/user.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userPayload: UserDto): Promise<{ token: string }> {
    const user = await this.validateUser(userPayload);
    return await this.generateToken(user);
  }

  async register(userPayload: UserDto): Promise<{ token: string }> {
    const candidate = await this.userService.findByEmail(userPayload.email);
    if (candidate) {
      throw new BadRequestException({
        message: 'Пользователь с таким email существует',
      });
    }

    const hashed = await bcrypt.hash(userPayload.password, 10);
    const user = await this.userService.create({
      ...userPayload,
      password: hashed,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userPayload: UserDto): Promise<User> {
    const user = await this.userService.findByEmail(userPayload.email);
    const passEquals = await bcrypt.compare(
      userPayload.password,
      user.password,
    );

    if (user && passEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Неккоректный email или пароль',
    });
  }
}
