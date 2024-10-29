import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId
			},
			include: {
				items: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}
}
