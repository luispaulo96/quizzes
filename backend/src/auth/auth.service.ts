import * as bcrypt from 'bcryptjs';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.user({
      vc_username: username,
    });

    if (!user) {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!bcrypt.compareSync(password, user.vc_password)) {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user) {
      Reflect.deleteProperty(user, 'vc_password');
    }

    const userJwt = {
      userId: user.pk_user,
      username: user.vc_username,
      userRole: user.fk_role,
    };

    return {
      access_token: await this.jwtService.signAsync(userJwt),
    };
  }
}
