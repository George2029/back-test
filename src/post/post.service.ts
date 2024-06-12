import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
	constructor(
		private sequelize: Sequelize
	) { }

	async findAllOwned(userId: string): Promise<Post[]> {
		return this.sequelize.query(`SELECT * FROM "Posts" where "userId" = $userId`, {
			bind: {
				userId
			},
			type: QueryTypes.SELECT
		});
	}

	async create(userId: string, createPostDto: CreatePostDto): Promise<void> {
		let { slug, categoryId, subcategoryId } = createPostDto;
		let result: any[];
		try {
			result = await this.sequelize.query(`INSERT INTO "Posts" (slug, "userId", "categoryId", "subcategoryId") select $slug, $userId, $categoryId, $subcategoryId from "Categories" INNER JOIN "Subcategories" on "categoryId"="Categories".id where "Subcategories".id = $subcategoryId and "Categories".id = $categoryId;`, {
				bind: {
					slug, categoryId, subcategoryId, userId
				},
				type: QueryTypes.INSERT
			});
		} catch (error) {
			console.log(error);
			throw new ConflictException(error.name);
		}
		if (!result[1]) {
			throw new ConflictException('nothing got inserted');
		}
	}

	async findAll(): Promise<Post[]> {
		let posts = await this.sequelize.query('SELECT "Posts".id, "Posts".slug, "Posts"."categoryId", "Posts"."subcategoryId", "Posts"."userId", "Categories".slug "categorySlug" FROM "Posts" INNER JOIN "Categories" on "categoryId"="Categories".id ORDER BY "Categories"."slug";', {
			type: QueryTypes.SELECT,
		}) as Post[];

		console.log('Post: findAll\n', posts);

		return posts;
	}

	async findOne(slug: string): Promise<Post> {
		let posts = await this.sequelize.query('SELECT * FROM "Posts" WHERE slug = $slug;', {
			bind: {
				slug
			},
			type: QueryTypes.SELECT,
		}) as Post[];

		if (!posts.length) throw new NotFoundException();
		console.log('Post: findOne\n', posts);

		return posts[0];
	}

	async update(slug: string, updatePostDto: UpdatePostDto) {
		let { slug: newSlug, categoryId, subcategoryId } = updatePostDto;
		// here I am using the fact that all the fields are NOT NULL;
		if (!newSlug) {
			newSlug = null;
		}
		if (!categoryId) {
			categoryId = null;
		}
		if (!subcategoryId) {
			subcategoryId = null;
		}
		let result: any
		try {
			result = await this.sequelize.query(`
			UPDATE "Posts" 
			SET 
			slug = COALESCE($newSlug, slug),  
			"categoryId" = COALESCE($categoryId, "categoryId"),  
			"subcategoryId" = COALESCE($subcategoryId, "subcategoryId") 
			WHERE 
			slug = $slug 
			AND 
			EXISTS (
			SELECT "Subcategories".id from "Subcategories" 
			INNER JOIN "Categories" on "categoryId"="Categories".id 
			WHERE 
			"Subcategories".id = COALESCE($subcategoryId, "subcategoryId")
			AND 
			"Categories".id = COALESCE($categoryId, "categoryId"))`,
				{
					bind: {
						slug, newSlug, categoryId, subcategoryId
					},
					type: QueryTypes.UPDATE
				}
			);
		} catch (error) {
			console.error(error);
			throw new ConflictException(error.name);
		}
		if (!result[1]) {
			throw new ConflictException('nothing got updated');
		}
		return;
	}

	async remove(slug: string): Promise<void> {
		try {
			await this.sequelize.query('DELETE FROM "Posts" WHERE slug = $slug', {
				bind: {
					slug
				},
				type: QueryTypes.DELETE
			});
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return
	}
}
