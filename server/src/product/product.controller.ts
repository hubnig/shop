import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import {
	GetAllProductsDto,
	ProductDtoCreate,
	ProductDtoUpdate
} from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllProductsDto) {
		return this.productService.getAll(queryDto); //Возможно добавить paginationDto
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id);
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug);
	}

	@Get('by-category/:categorySlug')
	async byCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async createProduct(productDtoCreate: ProductDtoCreate) {
		return this.productService.create(productDtoCreate);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	async updateProduct(
		@Param('id') id: string,
		ProductDtoUpdate: ProductDtoUpdate
	) {
		return this.productService.update(+id, ProductDtoUpdate);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(+id);
	}
}
