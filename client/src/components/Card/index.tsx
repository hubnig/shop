// app/components/CardProduct.tsx
'use client'

import { IProduct } from '@/types/product.interface'
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import classes from './Card.module.css'
import { Heart } from 'lucide-react'
import { useState } from 'react'

interface CardProduct {
	product: IProduct
}

const CardProduct = ({ product }: CardProduct) => {
	const [isFavorite, setIsFavorite] = useState(false) // Состояние для отслеживания избранного

	const toggleFavorite = () => {
		setIsFavorite(prev => !prev) // Переключаем состояние
	}


	return (
		<Card withBorder radius="md" className={classes.card}>
			<Heart className={classes.heart} onClick={toggleFavorite} color={isFavorite ? 'red' : 'gray'}/>
			<Card.Section className={classes.imageSection}>
				<Image src={product.images[0]} alt={product.name} />
			</Card.Section>

			<Group justify="space-between" mt="md" gap={8} mb={16}>
				<div>
					<Text fw={500}>{product.name}</Text>
				</div>
				<Badge variant="outline">25% off</Badge>{' '}
			</Group>

			<Card.Section className={classes.section}>
				<Group gap={30}>
					<div>
						<Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
							${product.price}
						</Text>
					</div>
					<Button radius="xl" style={{ flex: 1 }}>
						Buy now
					</Button>
				</Group>
			</Card.Section>
		</Card>
	)
}

export default CardProduct
