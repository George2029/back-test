import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [AuthModule, PostModule, CategoryModule, SubcategoryModule, UserModule,

		SequelizeModule.forRoot({
			dialect: 'postgres',
			username: process.env.POSTGRES_USER,
			host: process.env.POSTGRES_HOST,
			database: process.env.POSTGRES_DB,
			password: process.env.POSTGRES_PASSWORD,
			autoLoadModels: true,
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
