import * as bcrypt from 'bcryptjs';
import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User as UserModel } from '../generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  async signUp(
    @Body()
    userData: {
      vc_username: string;
      vc_password: string;
    },
  ): Promise<UserModel> {
    const findUser = await this.usersService.user({
      vc_username: userData.vc_username,
    });
    if (findUser) {
      throw new HttpException(
        'Nome do usuário já cadastrado, escolha outro nome!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.usersService.createUser({
      vc_username: userData.vc_username,
      vc_password: bcrypt.hashSync(userData.vc_password),
    });

    Reflect.deleteProperty(newUser, 'vc_password');

    return Promise.resolve(newUser);
  }
}
