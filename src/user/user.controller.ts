import { Controller, Get, Body, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import type { User } from './types/User.type';
import { AuthGuard } from './../auth.guard';

@Controller('users')
export class UserController {
	constructor(
		private userService: UserService
	) { }

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@UseGuards(AuthGuard)
	@Get('protected')
	protected(@Request() request: Request) {
		console.log(request['user']);
		return 'protected';
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}
}
