import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [UserModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '10600s' },
		}),
	],
	controllers: [AuthController],
	providers: [UserService, AuthService]
})
export class AuthModule { }
