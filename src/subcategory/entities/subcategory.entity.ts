import { Column, HasMany, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './../../category/entities/category.entity';
import { User } from './../../user/entities/user.entity';
import { Post } from './../../post/entities/post.entity';

@Table({
	createdAt: false,
	updatedAt: false
})
export class Subcategory extends Model {
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
	slug: string;

	@ForeignKey(() => Category)
	@Column({
		allowNull: false
	})
	categoryId: number;

	@BelongsTo(() => Category)
	category: Category;

	@ForeignKey(() => User)
	@Column({
		allowNull: false
	})
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Post)
	posts: Post[];

}
