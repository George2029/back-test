import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	slug: string;

	@IsInt()
	categoryId: number;

	@IsInt()
	subcategoryId: number;
}
