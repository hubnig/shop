// app/components/CardProduct.tsx
'use client'

import { IProduct } from '@/types/product.interface'
import { Badge, Button, Card, Group, Image, Rating, Text } from '@mantine/core'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import AddToCartButton from './AddToCartButton'
import classes from './Card.module.css'

interface CardProduct {
	product: IProduct
}

const CardProduct = ({ product }: CardProduct) => {
	const [isFavorite, setIsFavorite] = useState(false) // Состояние для отслеживания избранного
	const [isHovering, setIsHovering] = useState(false) // Состояние для отслеживания наведения

	const toggleFavorite = () => {
		setIsFavorite(prev => !prev) // Переключаем состояние
	}

	return (
		<Card
			withBorder
			radius="md"
			className={classes.card}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Heart
				className={classes.heart}
				onClick={toggleFavorite}
				color={isFavorite ? '#f8104b' : 'gray'}
				display={isHovering ? 'block' : 'none'}
			/>
			<Card.Section className={classes.imageSection}>
				<Image
					className={classes.image}
					src={product.images[0]}
					alt={product.name}
				/>
			</Card.Section>
			<Group justify="space-between" mt="md" gap={8} mb={16}>
				<div>
					<Text fw={500}>{product.name}</Text>
					<Rating value={3.5} fractions={2} readOnly />
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
					<AddToCartButton product={product} />
				</Group>
			</Card.Section>
		</Card>
	)
}

export default CardProduct
