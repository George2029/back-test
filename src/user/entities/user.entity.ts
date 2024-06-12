import { Column, HasMany, Model, Table, DataType } from 'sequelize-typescript';
import { Category } from './../../category/entities/category.entity';
import { Subcategory } from './../../subcategory/entities/subcategory.entity';
import { Post } from './../../post/entities/post.entity';

@Table({
	createdAt: false,
	updatedAt: false
})
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column({
		allowNull: false,
		unique: true
	})
	username: string;

	@Column({
		allowNull: false
	})
	password: string;

	@HasMany(() => Post)
	posts: Post[];

	@HasMany(() => Subcategory)
	subcategories: Subcategory[];

	@HasMany(() => Category)
	categories: Category[];
}

