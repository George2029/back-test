import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

type Token = {
	access_token: string
}

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@Post('/login')
	async login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
		return this.authService.validateUser(loginUserDto);
	}

	@Post('/logout')
	async logout() {
		return true;
	}
}
