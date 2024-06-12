import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('API')
		.setDescription('test API description')
		.setVersion('1.0')
		.addTag('test')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();

