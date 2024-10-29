import { Prisma } from '@prisma/client';
import {
	ArrayMinSize,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator';

export class ProductDtoCreate implements Prisma.ProductCreateInput {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	slug: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsInt()
	@IsNotEmpty()
	price: number;

	@ArrayMinSize(1)
	images?: string[];

	@IsInt()
	@IsNotEmpty()
	categoryId: number; // Поле для идентификатора категории
}

export class ProductDtoUpdate implements Prisma.ProductUpdateInput {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	slug: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsInt()
	@IsNotEmpty()
	price: number;

	@ArrayMinSize(1)
	images?: string[];

	@IsInt()
	@IsNotEmpty()
	categoryId: number; // Поле для идентификатора категории
}

export enum ProductSortField {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export class GetAllProductsDto implements Prisma.ProductFindManyArgs {
	@IsOptional()
	@IsEnum(ProductSortField)
	sort?: ProductSortField;

	@IsOptional()
	@IsString()
	searchTerm?: string;
}
