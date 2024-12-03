import { instance } from '@/api/api.interceptor'
import { IStatistics } from '@/types/statistics.interface' // Импортируйте интерфейс для статистики
import { IErrorResponse } from '@/types/error.interface'

export const StatisticsService = {
	// Кэш для хранения статистики
	cache: new Map<number, IStatistics>(),

	/**
	 * Получение основной статистики пользователя
	 * @returns {Promise<IStatistics | undefined>} Основная статистика
	 */
	async getMainStatistics(): Promise<IStatistics | undefined> {
		try {
			const userId = 1 // Здесь вы можете получить ID пользователя из контекста или хранилища состояния
			if (this.cache.has(userId)) {
				return this.cache.get(userId)!
			}

			const response = await instance.get<IStatistics>('/statistics/main')
			const data = response.data // Извлечение данных из ответа

			// Сохранение в кэш
			this.cache.set(userId, data)
			return data
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
