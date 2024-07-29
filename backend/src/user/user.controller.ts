import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getPostById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Post('createUser')
  async createUser(
    @Body() userData: { email: string; name: string; password: string },
  ): Promise<UserModel> {
    const { email, name, password } = userData;
    return this.userService.createUser({ email, name, password });
  }
}
