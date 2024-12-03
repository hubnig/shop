'use client'

import { useEffect, useState } from 'react'
import { Grid, Skeleton } from '@mantine/core'

import CardProduct from '../../components/Card'
import { IProduct } from '../../types/product.interface'

const ProductList = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [loading, setLoading] = useState<boolean>(true) 

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/product', {
					cache: 'force-cache',
					next: { revalidate: 60 },
				}) 
				if (!response.ok) {
					throw new Error('Failed to fetch products')
				}
				const data = await response.json()
				setProducts(data.products) 
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false) 
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
