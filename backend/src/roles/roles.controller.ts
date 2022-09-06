import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './../decorators/roles.decorator';
import { RolesGuard } from './../guards/roles.guard';
import { RoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Метод создает новую роль' })
  @ApiResponse({
    status: 200,
    type: RoleDto,
  })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  async create(@Body() rolePayload: RoleDto) {
    return await this.roleService.create(rolePayload);
  }

  @Get(':value')
  @ApiOperation({ summary: 'Метод находит роль по названию' })
  @ApiResponse({
    status: 200,
    type: RoleDto,
  })
  async findByValue(@Param('value') value: string) {
    return await this.roleService.findByValue(value);
  }
}
