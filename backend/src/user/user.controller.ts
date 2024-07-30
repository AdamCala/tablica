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
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
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
    @Body() UserData: { email: string; password: string },
  ): Promise<number> {
    const { email, password } = UserData;
    const user = await this.userService.userByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Passwords do not match');
    }
    return user.id;
  }

  @Post('register')
  async register(
    @Body() UserData: { email: string; name: string; password: string },
  ): Promise<number> {
    const { email, name, password } = UserData;
    const userEmail = await this.userService.userByEmail(email);
    if (userEmail) {
      throw new NotFoundException('Email already exists');
    }
    const newUser = await this.createUser(UserData);
    return newUser.id;
  }
}
