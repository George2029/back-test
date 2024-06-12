import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryGuard implements CanActivate {
	constructor(private readonly categoryService: CategoryService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { params: { slug }, user } = request;

		let post = await this.categoryService.findOne(slug);

		if (!post) throw new BadRequestException();

		return post.userId == user.sub;

	}
}
