import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subcategory } from './entities/subcategory.entity';

@Module({
	imports: [
		SequelizeModule.forFeature([Subcategory]),
	],
	controllers: [SubcategoryController],
	providers: [SubcategoryService],
})
export class SubcategoryModule { }
