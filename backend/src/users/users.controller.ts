import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { User as UserModel } from '../generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    const listUsers = await this.UsersService.users({
      orderBy: [{ nu_exp_points: 'desc' }, { dt_created_at: 'asc' }],
    });

    for (const user of listUsers) {
      Reflect.deleteProperty(user, 'vc_password');
    }

    return Promise.resolve(listUsers);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): any {
    const user = this.UsersService.user({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      pk_user: Number(req.userJwt.userId),
    });

    Reflect.deleteProperty(user, 'vc_password');

    return Promise.resolve(user);
  }
}
