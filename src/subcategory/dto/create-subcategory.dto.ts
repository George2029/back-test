import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateSubcategoryDto {
	@IsString()
	@IsNotEmpty()
	slug: string;

	@IsInt()
	categoryId: number;
}
