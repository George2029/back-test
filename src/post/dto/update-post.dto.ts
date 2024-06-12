import { IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	slug?: string;

	@IsOptional()
	@IsInt()
	categoryId?: number;

	@IsOptional()
	@IsInt()
	subcategoryId?: number;
}
