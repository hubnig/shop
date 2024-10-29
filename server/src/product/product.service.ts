import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import {
	GetAllProductsDto,
	ProductDtoCreate,
	ProductDtoUpdate,
	ProductSortField
} from './product.dto';
import {
	productReturnObject,
	productReturnObjectFullest
} from './return-product.object';

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	private async findProductById(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: productReturnObjectFullest
		});
		if (!product) throw new NotFoundException('Product not found');
		return product;
	}

	private async findProductBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: productReturnObjectFullest
		});
		if (!product) throw new NotFoundException('Product not found');
		return product;
	}

	async byId(id: number) {
		return this.findProductById(id);
	}

	async bySlug(slug: string) {
		return this.findProductBySlug(slug);
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: { category: { slug: categorySlug } },
			select: productReturnObjectFullest
		});
		if (!products) throw new NotFoundException('Products not found');
		return products;
	}

	async getAll(dto: GetAllProductsDto = {}, paginationDto: PaginationDto = {}) {
		const { sort, searchTerm } = dto;

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

		if (sort === ProductSortField.HIGH_PRICE)
			prismaSort.push({ price: 'desc' });
		else if (sort === ProductSortField.LOW_PRICE)
			prismaSort.push({ price: 'asc' });
		else if (sort === ProductSortField.OLDEST)
			prismaSort.push({ createdAt: 'asc' });
		else if (sort === ProductSortField.NEWEST)
			prismaSort.push({ createdAt: 'desc' });

		const prismaSearchTerm: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{ name: { contains: searchTerm, mode: 'insensitive' } },
						{
							category: { name: { contains: searchTerm, mode: 'insensitive' } }
						},
						{ description: { contains: searchTerm, mode: 'insensitive' } }
					]
				}
			: {};

		const { perPage, skip } =
			this.paginationService.getPagination(paginationDto); // возможно пересмотреть

		const products = await this.prisma.product.findMany({
			where: prismaSearchTerm,
			orderBy: prismaSort,
			skip,
			take: perPage
		});

		if (!products) throw new NotFoundException('Products not found');

		return {
			products,
			length: await this.prisma.product.count({ where: prismaSearchTerm })
		};
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id);

		if (!currentProduct)
			throw new NotFoundException('Current product not found');

		const product = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: productReturnObject
		});

		return product;
	}

	async create(dto: ProductDtoCreate) {
		const product = await this.prisma.product.create({
			data: {
				name: dto.name,
				slug: slugify(dto.name, { lower: true }),
				price: dto.price,
				description: dto.description,
				images: dto.images,
				categoryId: dto.categoryId
			}
		});
		return product.id;
	}

	async update(id: number, dto: ProductDtoUpdate) {
		const { description, images, name, price, categoryId } = dto;

		return this.prisma.product.update({
			where: { id },
			data: {
				description,
				images,
				name,
				price,
				category: { connect: { id: categoryId } }
			}
		});
	}

	async delete(id: number) {
		await this.findProductById(id); // Проверяем существование категории
		return this.prisma.product.delete({
			where: { id }
		});
	}
}
