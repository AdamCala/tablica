import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma, User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<(Post & { author: { name: string } })[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    const post = await this.prisma.post.findUnique({
      where,
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.update({
      where,
      data,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where,
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.delete({
      where,
    });
  }
}
