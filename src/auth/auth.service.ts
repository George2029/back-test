import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService
	) { }

	async validateUser(loginUserDto: LoginUserDto) {
		let { username, password } = loginUserDto;

		const user = await this.userService.findOne(username);
		const hashedPassword = user.password;
		let valid = bcrypt.compare(password, hashedPassword);
		if (!valid) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, username: user.username };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};

	}
}
