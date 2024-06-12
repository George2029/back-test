import { UseGuards, Controller, Get, Request, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from './../auth.guard';
import { PostGuard } from './post.guard';

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) { }

	@UseGuards(AuthGuard)
	@Get('owned')
	findAllOwned(@Request() request: Request) {
		return this.postService.findAllOwned(request['user'].sub);
	}

	@UseGuards(AuthGuard)
	@Post()
	create(@Request() request: Request, @Body() createPostDto: CreatePostDto) {
		return this.postService.create(request['user'].sub, createPostDto);
	}

	@Get()
	findAll() {
		return this.postService.findAll();
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.postService.findOne(slug);
	}

	@UseGuards(AuthGuard, PostGuard)
	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(slug, updatePostDto);
	}

	@UseGuards(AuthGuard, PostGuard)
	@Delete(':slug')
	remove(@Param('slug') slug: string) {
		return this.postService.remove(slug);
	}
}
