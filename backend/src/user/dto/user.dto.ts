import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Неккоретный email' })
  readonly email: string;

  @ApiProperty()
  @Length(8, 100, { message: 'Пароль должен быть не меньше 8 символов' })
  readonly password: string;
}
