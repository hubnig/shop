import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	async register(dto: AuthDto) {
		const existUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});

		if (existUser) throw new BadRequestException('User already exists');

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number({ style: 'international' }),
				password: await hash(dto.password)
			}
		});

		const tokens = await this.issueToken(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		};
	}
	private async issueToken(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: '15m'
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		});

		return { accessToken, refreshToken };
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		};
	}
}
