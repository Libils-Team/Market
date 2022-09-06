import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum Roles {
  Admin,
  User,
  Moderator,
}

export class RoleDto {
  @ApiProperty()
  @IsEnum(Roles, { message: `Должен быть одним из ${Object.keys(Roles)}` })
  readonly value: string;

  @ApiProperty()
  readonly description: string;
}
