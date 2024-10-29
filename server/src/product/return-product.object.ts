import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/return-category.object';
import { returnReviewObject } from 'src/review/return-review.object';

export const productReturnObject = {
	id: true,
	name: true,
	price: true,
	image: true,
	description: true,
	slug: true,
	createdAt: true
};

export const productReturnObjectFullest: Prisma.ProductSelect = {
	...productReturnObject,
	reviews: {
		select: returnReviewObject
	},
	category: {
		select: returnCategoryObject
	}
};
