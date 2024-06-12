import { HasMany, Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Post } from './../../post/entities/post.entity';
import { Subcategory } from './../../subcategory/entities/subcategory.entity';
import { User } from './../../user/entities/user.entity';

@Table({
	createdAt: false,
	updatedAt: false
})
export class Category extends Model {
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

	@ForeignKey(() => User)
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Subcategory)
	subcategories: Subcategory[];

	@HasMany(() => Post)
	posts: Post[];
}
