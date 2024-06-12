import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { AuthGuard } from './../auth.guard';
import { SubcategoryGuard } from './subcategory.guard';
import { Subcategory } from './entities/subcategory.entity';

@Controller('subcategories')
export class SubcategoryController {
	constructor(private readonly subcategoryService: SubcategoryService) { }

	@UseGuards(AuthGuard)
	@Get('owned')
	findAllOwned(@Request() request: Request): Promise<Subcategory[]> {
		return this.subcategoryService.findAllOwned(request['user'].sub);
	}

	@UseGuards(AuthGuard)
	@Post()
	create(@Request() request: Request, @Body() createSubcategoryDto: CreateSubcategoryDto) {
		return this.subcategoryService.create(request['user'].sub, createSubcategoryDto);
	}

	@Get()
	findAll() {
		return this.subcategoryService.findAll();
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.subcategoryService.findOne(slug);
	}

	@UseGuards(AuthGuard, SubcategoryGuard)
	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
		return this.subcategoryService.update(slug, updateSubcategoryDto);
	}

	@UseGuards(AuthGuard, SubcategoryGuard)
	@Delete(':slug')
	remove(@Param('slug') slug: string) {
		return this.subcategoryService.remove(slug);
	}
}
