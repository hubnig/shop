import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import { BaggageClaim, ShoppingCart } from 'lucide-react'
import React from 'react'

const AddToCartButton: React.FC<{ product: IProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	// Проверяем, есть ли товар в корзине
	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	const handleClick = () => {
		if (currentElement) {
			// Удаляем из корзины
			removeFromCart({ id: currentElement.id }) // Передаем ID для удаления
		} else {
			// Добавляем в корзину
			addToCart({
				product,
				quantity: 1,
				price: product.price
			})
		}
	}

	return (
		<span className='cursor-pointer' onClick={handleClick}>
			{currentElement ? <ShoppingCart /> : <BaggageClaim />}
		</span>
	)
}

export default AddToCartButton
