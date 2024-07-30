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
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: number): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('posts')
  async getPosts(): Promise<PostModel[]> {
    return this.postService.findAll();
  }

  @Post('createPost')
  async createPost(
    @Body()
    postData: {
      title: string;
      content: string;
      image: string;
      authorId: number;
    },
  ): Promise<PostModel> {
    const { title, content, image, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      image,
      author: {
        connect: { id: authorId },
      },
    });
  }

  @Put('updatePost')
  async updatePost(
    @Body()
    updatePostData: {
      where: { id: number };
      data: { title?: string; content?: string; image?: string };
    },
  ): Promise<PostModel> {
    const { where, data } = updatePostData;
    return this.postService.updatePost({ where, data });
  }

  @Delete('deletePost/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    const post = await this.getPostById(id);
    const del = await this.postService.deletePost(post);
    if (!del) {
      throw new NotFoundException('Unknown error');
    }
    return true;
  }
}
