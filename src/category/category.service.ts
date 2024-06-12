import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
	constructor(
		private sequelize: Sequelize
	) { }

	async findOwned(userId: string): Promise<Category[]> {
		return this.sequelize.query(`SELECT * FROM "Categories" WHERE "userId" = $userId`, {
			bind: {
				userId
			},
			type: QueryTypes.SELECT
		});
	}

	async create(userId: string, createCategoryDto: CreateCategoryDto): Promise<void> {
		let { slug } = createCategoryDto;
		try {
			await this.sequelize.query('insert into "Categories" (slug, "userId") VALUES ($slug, $userId);', {
				bind: {
					slug, userId
				},
				type: QueryTypes.INSERT
			});
		} catch (error) {
			console.log(error);
			throw new ConflictException(error.name);
		}
	}

	async findAll(): Promise<Category[]> {
		let posts = await this.sequelize.query('select * from "Categories";', {
			type: QueryTypes.SELECT,
		}) as Category[];

		console.log('Category: findAll\n', posts);

		return posts;
	}

	async findOne(slug: string): Promise<Category> {
		let posts = await this.sequelize.query('select * from "Categories" where slug = $slug;', {
			bind: {
				slug
			},
			type: QueryTypes.SELECT,
		}) as Category[];
		if (!posts.length) {
			throw new NotFoundException();
		}

		return posts[0];
	}

	async update(slug: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
		let newSlug = updateCategoryDto.slug || null;
		try {
			await this.sequelize.query(`UPDATE "Categories" SET slug = COALESCE($newSlug, slug) where slug = $slug`, {
				bind: {
					slug,
					newSlug
				}
			});
		} catch (error) {
			throw new ConflictException(error.name);
		}
	}

	async remove(slug: string): Promise<void> {
		try {
			await this.sequelize.query(`DELETE FROM "Categories" where slug = $slug`, {
				bind: {
					slug
				}
			});
		} catch (error) {
			throw new ConflictException(error.name);
		}
	}
}
