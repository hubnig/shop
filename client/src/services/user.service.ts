import { instance } from '@/api/api.interceptor'
import { IUser } from '@/types/user.interface' // Импортируйте интерфейс пользователя
import { IErrorResponse } from '@/types/error.interface'

export const UserService = {
	// Кэш для хранения профиля пользователя
	cache: new Map<number, IUser>(),

	/**
	 * Получение профиля пользователя
	 * @param id - ID пользователя
	 * @returns {Promise<IUser | undefined>} Профиль пользователя
	 */
	async getProfile(id: number): Promise<IUser | undefined> {
		try {
			// Проверка кэша
			if (this.cache.has(id)) {
				return this.cache.get(id)!
			}

			const response = await instance.get<IUser>(`/users/profile`)
			const data = response.data // Извлечение данных из ответа

			// Сохранение в кэш
			this.cache.set(id, data)
			return data
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Обновление профиля пользователя
	 * @param id - ID пользователя
	 * @param dto - Данные для обновления профиля
	 * @returns {Promise<IUser | undefined>} Обновленный профиль пользователя
	 */
	async updateProfile(id: number, dto: IUser): Promise<IUser | undefined> {
		try {
			const response = await instance.put<IUser>(`/users/profile`, dto)
			// Очистка кэша после обновления профиля
			this.cache.set(id, response.data)
			return response.data // Извлечение данных из ответа
		} catch (error) {
			this.handleError(error)
			return undefined // Возвращаем undefined в случае ошибки
		}
	},

	/**
	 * Добавление или удаление товара из избранного
	 * @param id - ID пользователя
	 * @param productId - ID продукта
	 * @returns {Promise<void>}
	 */
	async toggleFavorites(id: number, productId: number): Promise<void> {
		try {
			await instance.patch(`/users/profile/favorites/${productId}`)
			// Обновление кэша при изменении избранного (если необходимо)
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
