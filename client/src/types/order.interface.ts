export interface IOrder {
	id: number
	productId: number // ID продукта
	quantity: number // Количество
	status: string // Статус заказа (например, "в обработке", "доставлен" и т.д.)
	createdAt: string // Дата создания заказа
}
