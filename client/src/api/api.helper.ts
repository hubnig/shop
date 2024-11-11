export const getContentType = () => ({
	'Content-Type': 'application/json',
})

export const errorCatch = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message // Возвращаем сообщение, если это экземпляр Error
	} else if (
		typeof error === 'object' &&
		error !== null &&
		'response' in error
	) {
		const response = (error as { response?: { data?: { message?: unknown } } })
			.response
		if (response && response.data) {
			const message = response.data.message
			return Array.isArray(message) ? message[0] : String(message)
		}
	}
	return String(error) // Резервный вариант для других типов ошибок
}
