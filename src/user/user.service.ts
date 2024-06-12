import { Injectable, ConflictException } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Sequelize } from 'sequelize-typescript';
import type { User } from './types/User.type';

@Injectable()
export class UserService {
	constructor(
		private sequelize: Sequelize
	) { }

	async create(createUserDto: CreateUserDto): Promise<void> {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(createUserDto.password, salt);
		try {
			await this.sequelize.query('insert into "Users" (username, password) VALUES (:username, :password);', {
				replacements: {
					username: createUserDto.username,
					password: hashedPassword
				},
				type: QueryTypes.INSERT
			});
		} catch (error) {
			throw new ConflictException(error.name);
		}
		return;
	}

	async findOne(username: string): Promise<User> {
		let user = await this.sequelize.query('select * from "Users" where username = (:username);', {
			replacements: {
				username
			},
			type: QueryTypes.SELECT,
		}) as User[];

		console.log('findOne:\n', user);

		return user[0];
	}

	async findAll(): Promise<User[]> {
		let users = await this.sequelize.query('select id, username from "Users";', {
			type: QueryTypes.SELECT,
		}) as User[];

		console.log('findAll:\n', users);

		return users;
	}

}
