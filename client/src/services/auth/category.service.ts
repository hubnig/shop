import { instance } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'
import { IErrorResponse } from '@/types/error.interface'



export const CategoryService = {
	// Кэш для хранения категорий
	cache: new Map<string, ICategory[]>(),

	/**
	 * Получение всех категорий
	 * @returns {Promise<ICategory[]>} Список категорий
	 */
	async getAll(): Promise<ICategory[]> {
		try {
			// Проверка кэша
			if (this.cache.has('allCategories')) {
				return this.cache.get('allCategories')!
			}

			const response = await instance.get<ICategory[]>('/categories')
			const data = response.data // Извлечение данных из ответа

			// Сохранение в кэш
			this.cache.set('allCategories', data)
			return data
		} catch (error) {
			this.handleError(error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	},

	/**
	 * Получение категории по слагу
	 * @param slug - Слаг категории
	 * @returns {Promise<ICategory>} Категория
	 */
	async getBySlug(slug: string): Promise<ICategory | undefined> {
		try {
			const response = await instance.get<ICategory>(`/categories/${slug}`)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Получение категории по ID
	 * @param id - ID категории
	 * @returns {Promise<ICategory>} Категория
	 */
	async getById(id: string): Promise<ICategory | undefined> {
		try {
			const response = await instance.get<ICategory>(`/categories/by-id/${id}`)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Создание новой категории
	 * @param name - Название категории
	 * @returns {Promise<ICategory>} Созданная категория
	 */
	async create(name: string): Promise<ICategory | undefined> {
		try {
			const response = await instance.post<ICategory>('/categories', { name })
			// Очистка кэша после создания новой категории
			this.cache.delete('allCategories')
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Обновление существующей категории
	 * @param id - ID категории
	 * @param name - Новое название категории
	 * @returns {Promise<ICategory>} Обновленная категория
	 */
	async update(id: string, name: string): Promise<ICategory | undefined> {
		try {
			const response = await instance.put<ICategory>(`/categories/${id}`, {
				name,
			})
			// Очистка кэша после обновления категории
			this.cache.delete('allCategories')
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Удаление категории по ID
	 * @param id - ID категории для удаления
	 * @returns {Promise<void>}
	 */
	async delete(id: string): Promise<void> {
		try {
			await instance.delete(`/categories/${id}`)
			// Очистка кэша после удаления категории
			this.cache.delete('allCategories')
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
