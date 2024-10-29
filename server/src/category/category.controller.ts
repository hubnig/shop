import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@HttpCode(200)
	@Get()
	async getAll() {
		return this.categoryService.getAll();
	}

	@HttpCode(200)
	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug);
	}

	@HttpCode(200)
	@Auth()
	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.categoryService.byId(+id);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto);
	}

	@HttpCode(201)
	@Auth()
	@Post()
	async create(@Body() name: string) {
		return this.categoryService.create(name);
	}

	@HttpCode(204)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id);
	}
}
