import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';

@Injectable()
export class PostGuard implements CanActivate {
	constructor(private readonly postService: PostService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { params: { slug }, user } = request;

		let post = await this.postService.findOne(slug);

		if (!post) throw new BadRequestException();

		return post.userId == user.sub;

	}
}
