import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './../decorators/roles.decorator';
import { RolesGuard } from './../guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Метод создает нового пользователя' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  async create(@Body() userPayload: UserDto) {
    return await this.userService.create(userPayload);
  }
}
