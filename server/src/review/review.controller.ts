import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.reviewService.getAll();
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('leave/:productId')
	async leaveReview(
		@Param('productId') productId: string,
		@Body() dto: ReviewDto,
		@CurrentUser('id') userId: number
	) {
		return this.reviewService.create(userId, +productId, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Get('rating/:productId')
	async getAvgRatingByProduct(@Param('productId') productId: string) {
		return this.reviewService.getAvgRatingByProduct(+productId);
	}
}
