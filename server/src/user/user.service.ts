import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						images: true,
						slug: true
					}
				},
				...selectObject
			}
		});

		if (!user) throw new Error('User not found');

		return user;
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});

		if (isSameUser && String(id) !== String(isSameUser.id))
			throw new Error('Email already exists');

		const user = await this.byId(id);

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				name: dto.name,
				phone: dto.phone,
				avatarPath: dto.avatarPath,
				password: dto.password ? await hash(dto.password) : user.password
			}
		});
	}

	async toggleFavorites(userId: number, productId: number) {
		const user = await this.byId(userId);

		if (!user) throw new Error('User not found');

		const isExist = user.favorites.some(favorite => favorite.id === productId);

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExist ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		});

		return 'Seccess';
	}
}
