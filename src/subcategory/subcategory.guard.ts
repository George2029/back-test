import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Injectable()
export class SubcategoryGuard implements CanActivate {
	constructor(private readonly subcategoryService: SubcategoryService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { params: { slug }, user } = request;

		let post = await this.subcategoryService.findOne(slug);

		if (!post) throw new BadRequestException();

		return post.userId == user.sub;

	}
}
