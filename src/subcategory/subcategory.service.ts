import { Injectable, ConflictException } from '@nestjs/common';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Sequelize } from 'sequelize-typescript';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { QueryTypes } from 'sequelize';

@Injectable()
export class SubcategoryService {
	constructor(
		private sequelize: Sequelize
	) { }

	async findAllOwned(userId: string): Promise<Subcategory[]> {
		return this.sequelize.query('SELECT * FROM "Subcategories" where "userId"=$userId', {
			bind: {
				userId
			},
			type: QueryTypes.SELECT
		});
	}

	async create(userId: string, createSubcategoryDto: CreateSubcategoryDto): Promise<void> {
		let { slug, categoryId } = createSubcategoryDto;
		console.log(slug, userId);
		try {
			await this.sequelize.query('insert into "Subcategories" (slug, "userId", "categoryId") VALUES ($slug, $userId, $categoryId);', {
				bind: {
					slug, categoryId, userId
				},
				type: QueryTypes.INSERT
			});
		} catch (error) {
			console.log(error);
			throw new ConflictException(error.name);
		}
	}

	async findAll(): Promise<Subcategory[]> {
		let posts = await this.sequelize.query('select * from "Subcategories";', {
			type: QueryTypes.SELECT,
		}) as Subcategory[];

		console.log('Subcategory: findAll\n', posts);

		return posts;
	}

	async findOne(slug: string): Promise<Subcategory> {
		let posts = await this.sequelize.query('select * from "Subcategories" where slug = $slug;', {
			bind: {
				slug
			},
			type: QueryTypes.SELECT,
		}) as Subcategory[];

		console.log('Subcategory: findOne\n', posts);

		return posts[0];
	}

	async update(slug: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<void> {
		let { slug: newSlug, categoryId } = updateSubcategoryDto;
		if (!newSlug) {
			newSlug = null;
		}
		if (!categoryId) {
			categoryId = null;
		}
		let result: any
		try {
			result = await this.sequelize.query('UPDATE "Subcategories" SET slug = COALESCE($newSlug, slug), "categoryId" = COALESCE($categoryId, "categoryId") WHERE slug = $slug', {
				bind: {
					slug, newSlug, categoryId
				},
				type: QueryTypes.UPDATE
			})
		} catch (error) {
			console.log(error);
			throw new ConflictException(error.name);
		}
		if (!result[1]) {
			throw new ConflictException('nothing got updated');
		}
	}

	async remove(slug: string): Promise<void> {
		let posts = await this.sequelize.query('DELETE FROM "Subcategories" where slug = $slug;', {
			bind: {
				slug
			},
			type: QueryTypes.DELETE,
		});

		console.log('Delete\n', posts);
	}
}
