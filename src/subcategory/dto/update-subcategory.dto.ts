import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateSubcategoryDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	slug: string;

	@IsOptional()
	@IsInt()
	categoryId: number;
}

