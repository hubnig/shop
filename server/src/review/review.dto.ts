import {
	IsNumber,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength
} from 'class-validator';

export class ReviewDto {
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number;

	@IsString()
	@MinLength(5)
	@MaxLength(200)
	text: string;
}
