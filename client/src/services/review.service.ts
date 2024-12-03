import { instance } from '@/api/api.interceptor'
import { IReview } from '@/types/review.interface' // Импортируйте интерфейс для отзыва
import { IErrorResponse } from '@/types/error.interface'

export const ReviewService = {
	// Кэш для хранения отзывов
	cache: new Map<string, IReview[]>(),

	/**
	 * Получение всех отзывов
	 * @returns {Promise<IReview[]>} Список отзывов
	 */
	async getAll(): Promise<IReview[]> {
		try {
			// Проверка кэша
			if (this.cache.has('allReviews')) {
				return this.cache.get('allReviews')!
			}

			const response = await instance.get<IReview[]>('/reviews')
			const data = response.data // Извлечение данных из ответа

			// Сохранение в кэш
			this.cache.set('allReviews', data)
			return data
		} catch (error) {
			this.handleError(error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	},

	/**
	 * Создание нового отзыва
	 * @param userId - ID пользователя
	 * @param productId - ID продукта
	 * @param dto - Данные отзыва
	 * @returns {Promise<IReview | undefined>} Созданный отзыв
	 */
	async create(
		userId: number,
		productId: number,
    dto: IReview
	): Promise<IReview | undefined> {
		try {
			const response = await instance.post<IReview>(
				'/reviews/leave/' + productId,
				{ ...dto, userId },
			)
			// Очистка кэша после создания нового отзыва
			this.cache.delete('allReviews')
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Получение среднего рейтинга по продукту
	 * @param productId - ID продукта
	 * @returns {Promise<number | undefined>} Средний рейтинг
	 */
	async getAvgRatingByProduct(productId: number): Promise<number | undefined> {
		try {
			const response = await instance.get<number>(
				`/reviews/rating/${productId}`,
			)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
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
