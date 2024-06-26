import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
//import { AuthGuard } from './../auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule { }
