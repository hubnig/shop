'use client'

import { Grid, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'
import CardProduct from '../../components/Card/Card' // Убедитесь, что путь к компоненту CardProduct правильный
import { Product } from '../../types/product.interface' // Импортируйте интерфейс Product

const ProductList = () => {
	const [products, setProducts] = useState<Product[]>([]) // Указываем тип состояния как массив Product
	const [loading, setLoading] = useState<boolean>(true) // Состояние загрузки

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/product', {
					cache: 'force-cache',
					next: { revalidate: 60 },
				}) // Замените на ваш URL
				if (!response.ok) {
					throw new Error('Failed to fetch products')
				}
				const data = await response.json()
				setProducts(data.products) // Убедитесь, что data.products соответствует типу Product[]
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false) // Устанавливаем состояние загрузки в false после завершения запроса
			}
		}

		fetchProducts()
	}, [])

	return (
		<Grid gutter='md' align='stretch'>
			{loading
				? // Отображаем скелетоны во время загрузки
				  Array.from({ length: 12 }).map((_, index) => (
						<Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
							<Skeleton height={768} animate={true} />
						</Grid.Col>
				  ))
				: products.map(product => (
						<Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
							<CardProduct product={product} />
						</Grid.Col>
				  ))}
		</Grid>
	)
}

export default ProductList
