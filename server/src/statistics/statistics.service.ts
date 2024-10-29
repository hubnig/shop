import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService
	) {}

	async getMain(userId: number) {
		const user = await this.userService.byId(userId, {
			orders: {
				select: {
					items: true
				}
			},
			reviews: true
		});

		const totalAmount = await this.prisma.orderItem.aggregate({
			_sum: {
				price: true // Суммируем цену всех OrderItem
			},
			where: {
				order: {
					userId // Фильтруем по userId
				}
			}
		});

		return [
			{
				name: 'Orders',
				value: user.orders.length
			},
			{
				name: 'Reviews',
				value: user.reviews.length
			},
			{
				name: 'Favorites',
				value: user.favorites.length
			},
			{
				name: 'Total amount',
				value: totalAmount._sum.price || 0
			}
		];
	}
}
