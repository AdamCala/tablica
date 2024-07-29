import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltOrRounds);

  return hash;
}

async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);

  return isMatch;
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
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
    userData.password = await hashPassword(userData.password);
    const { email, name, password } = userData;
    return this.userService.createUser({ email, name, password });
  }

  @Put('updateUser')
  async updateUser(
    @Body()
    updateUserData: {
      where: { id: number };
      data: { email?: string; name?: string; password?: string };
    },
  ): Promise<UserModel> {
    const { where, data } = updateUserData;
    return this.userService.updateUser({ where, data });
  }

  @Post('login')
  async login(
    @Body() UserData: { id: string; password: string },
  ): Promise<boolean> {
    const { id, password } = UserData;
    const user = await this.getUserById(id);
    const providedPassword = await hashPassword(user.password);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (providedPassword == user.password) {
      throw new NotFoundException('Passwords do not match');
    } else {
      return true;
    }
  }
}
