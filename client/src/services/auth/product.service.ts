import { instance } from '@/api/api.interceptor'
import { IProduct } from '@/types/product.interface' // Предполагается, что у вас есть интерфейс IProduct
import { IErrorResponse } from '@/types/error.interface' // Интерфейс для обработки ошибок

export const ProductService = {
	// Кэш для хранения продуктов
	cache: new Map<string, IProduct[]>(),

	/**
	 * Получение всех продуктов с возможностью фильтрации и пагинации.
	 * @param queryDto - DTO для фильтрации продуктов.
	 * @returns {Promise<IProduct[]>} Список продуктов.
	 */
	async getAll(queryDto: any): Promise<IProduct[]> {
		try {
			const response = await instance.get<IProduct[]>('/product', {
				params: queryDto,
			})
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	},

	/**
	 * Получение похожих продуктов по ID.
	 * @param id - ID продукта.
	 * @returns {Promise<IProduct[]>} Список похожих продуктов.
	 */
	async getSimilar(id: string): Promise<IProduct[]> {
		try {
			const response = await instance.get<IProduct[]>(`/product/similar/${id}`)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	},

	/**
	 * Получение продукта по слагу.
	 * @param slug - Слаг продукта.
	 * @returns {Promise<IProduct | undefined>} Продукт или undefined.
	 */
	async getBySlug(slug: string): Promise<IProduct | undefined> {
		try {
			const response = await instance.get<IProduct>(`/product/by-slug/${slug}`)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Получение продуктов по слагу категории.
	 * @param categorySlug - Слаг категории.
	 * @returns {Promise<IProduct[]>} Список продуктов в категории.
	 */
	async byCategory(categorySlug: string): Promise<IProduct[]> {
		try {
			const response = await instance.get<IProduct[]>(
				`/product/by-category/${categorySlug}`,
			)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	},

	/**
	 * Создание нового продукта.
	 * @param productDtoCreate - DTO для создания продукта.
	 * @returns {Promise<IProduct | undefined>} Созданный продукт или undefined.
	 */
	async create(productDtoCreate: any): Promise<IProduct | undefined> {
		try {
			const response = await instance.post<IProduct>(
				'/product',
				productDtoCreate,
			)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Обновление существующего продукта.
	 * @param id - ID продукта.
	 * @param productDtoUpdate - DTO для обновления продукта.
	 * @returns {Promise<IProduct | undefined>} Обновленный продукт или undefined.
	 */
	async update(
		id: string,
		productDtoUpdate: any,
	): Promise<IProduct | undefined> {
		try {
			const response = await instance.put<IProduct>(
				`/product/${id}`,
				productDtoUpdate,
			)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Удаление продукта по ID.
	 * @param id - ID продукта для удаления.
	 */
	async delete(id: string): Promise<void> {
		try {
			await instance.delete(`/product/${id}`)
		} catch (error) {
			this.handleError(error)
		}
	},

	/**
	 * Обработка ошибок и вывод сообщения об ошибке
	 * @param error - Ошибка, возникшая при выполнении запроса
	 */
	handleError(error: unknown): void {
		let message = 'Произошла ошибка при выполнении запроса.'

		if (error instanceof Error) {
			message = error.message
		} else if (
			typeof error === 'object' &&
			error !== null &&
			'response' in error
		) {
			const response = (error as { response?: IErrorResponse }).response
			if (response && response.message) {
				message = response.message
			}
		}

		console.error(message) // Логируем ошибку в консоль или можно использовать другой метод логирования.
		throw new Error(message) // Бросаем ошибку дальше, чтобы её можно было обработать на уровне компонента.
	},
}
