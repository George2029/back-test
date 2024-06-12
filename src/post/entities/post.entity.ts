import { Column, Model, Table, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';

@Table({
	createdAt: false,
	updatedAt: false
})
export class Post extends Model {
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
	categoryId: number;

	@BelongsTo(() => Category)
	category: Category;

	@ForeignKey(() => Subcategory)
	subcategoryId: number;

	@BelongsTo(() => Subcategory)
	subcategory: Subcategory;

	@ForeignKey(() => User)
	userId: number;

	@BelongsTo(() => User)
	user: User;
}

