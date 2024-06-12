import { UseGuards, Request, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from './../auth.guard';
import { Category } from './entities/category.entity';
import { CategoryGuard } from './category.guard';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@UseGuards(AuthGuard)
	@Get('owned')
	async findOwned(@Request() request: Request): Promise<Category[]> {
		return this.categoryService.findOwned(request['user'].sub);
	}

	@UseGuards(AuthGuard)
	@Post()
	create(@Request() request: Request, @Body() createCategoryDto: CreateCategoryDto): Promise<void> {
		return this.categoryService.create(request['user'].sub, createCategoryDto);
	}

	@Get()
	findAll(): Promise<Category[]> {
		return this.categoryService.findAll();
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.categoryService.findOne(slug);
	}

	@UseGuards(AuthGuard, CategoryGuard)
	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoryService.update(slug, updateCategoryDto);
	}

	@UseGuards(AuthGuard, CategoryGuard)
	@Delete(':slug')
	remove(@Param('slug') slug: string) {
		return this.categoryService.remove(slug);
	}
}
