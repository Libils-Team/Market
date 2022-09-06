import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from './../auth/auth.module';
import { Role } from './../roles/roles.model';
import { UserRoles } from './../roles/user-roles.model';
import { RolesModule } from './../roles/roles.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => AuthModule),
    RolesModule,
  ],
  exports: [UserService],
})
export class UserModule {}
