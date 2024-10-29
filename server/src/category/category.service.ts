import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './category.dto';
import { returnCategoryObject } from './return-category.object';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	private async findCategoryById(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		});
		if (!category) throw new NotFoundException('Category not found');
		return category;
	}

	private async findCategoryBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject
		});
		if (!category) throw new NotFoundException('Category not found');
		return category;
	}

	async byId(id: number) {
		return this.findCategoryById(id);
	}

	async bySlug(slug: string) {
		return this.findCategoryBySlug(slug);
	}

	async getAll() {
		const categories = await this.prisma.category.findMany({
			select: returnCategoryObject
		});
		if (!categories.length) throw new NotFoundException('Categories not found');
		return categories;
	}

	async create(name: string = 'New Category') {
		const slug = slugify(name, { lower: true });
		return this.prisma.category.create({
			data: { name, slug }
		});
	}

	async update(id: number, dto: CategoryDto) {
		await this.findCategoryById(id); // Проверяем существование категории
		const slug = slugify(dto.name, { lower: true });

		return this.prisma.category.update({
			where: { id },
			data: { name: dto.name, slug }
		});
	}

	async delete(id: number) {
		await this.findCategoryById(id); // Проверяем существование категории
		return this.prisma.category.delete({
			where: { id }
		});
	}
}
