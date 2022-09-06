import { UserDto } from './../user/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PayloadUser } from './dto/payload.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Метод авторизовывает пользователя' })
  @ApiResponse({
    status: 200,
    type: PayloadUser,
  })
  async login(@Body() userPayload: UserDto) {
    return await this.authService.login(userPayload);
  }

  @Post('register')
  @ApiOperation({ summary: 'Метод регистрирует нового пользователя' })
  @ApiResponse({
    status: 200,
    type: PayloadUser,
  })
  async register(@Body() userPayload: UserDto) {
    return await this.authService.register(userPayload);
  }
}
