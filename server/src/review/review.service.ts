import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const reviews = await this.prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		});
		if (!reviews.length) throw new NotFoundException('Reviews not found');
		return reviews;
	}

	async create(userId: number, productId: number, dto: ReviewDto) {
		return this.prisma.review.create({
			data: {
				...dto,
				product: { connect: { id: productId } },
				user: { connect: { id: userId } }
			}
		});
	}

	async getAvgRatingByProduct(productId: number) {
		const result = await this.prisma.review.aggregate({
			where: { productId },
			_avg: { rating: true }
		});
		return result._avg.rating.toFixed(1);
	}
}
