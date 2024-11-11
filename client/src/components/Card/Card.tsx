// app/components/CardProduct.tsx
'use client'

import { Product } from '@/types/product.interface'
import { Badge, Button, Card, Center, Group, Image, Text } from '@mantine/core'
import { IconGasStation, IconUsers } from '@tabler/icons-react'
import classes from './Card.module.css'

interface CardProduct {
	product: Product
}

const CardProduct = ({ product }: CardProduct) => {
	const features = [
		{ label: `${product.price} USD`, icon: IconGasStation }, // Пример использования цены
		{ label: 'Available', icon: IconUsers }, // Пример использования статуса
		// Добавьте другие характеристики по необходимости
	].map(feature => (
		<Center key={feature.label}>
			<feature.icon size='1.05rem' className={classes.icon} stroke={1.5} />
			<Text size='xs'>{feature.label}</Text>
		</Center>
	))

	return (
		<Card withBorder radius='md' className={classes.card}>
			<Card.Section className={classes.imageSection}>
				<Image
					src='https://steamcdn-a.akamaihd.net/steam/apps/1601580/library_600x900.jpg'
					alt={product.name}
				/>
			</Card.Section>

			<Group justify='space-between' mt='md'>
				<div>
					<Text fw={500}>{product.name}</Text>
					<Text fz='xs' c='dimmed'>
						{product.description}
					</Text>
				</div>
				<Badge variant='outline'>25% off</Badge>{' '}
				{/* Замените на актуальную информацию */}
			</Group>

			<Card.Section className={classes.section} mt='md'>
				<Text fz='sm' c='dimmed' className={classes.label}>
					Features
				</Text>

				<Group gap={8} mb={-8}>
					{features}
				</Group>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Group gap={30}>
					<div>
						<Text fz='xl' fw={700} style={{ lineHeight: 1 }}>
							${product.price}
						</Text>
						<Text fz='sm' c='dimmed' fw={500} style={{ lineHeight: 1 }} mt={3}>
							per day
						</Text>
					</div>

					<Button radius='xl' style={{ flex: 1 }}>
						Rent now
					</Button>
				</Group>
			</Card.Section>
		</Card>
	)
}

export default CardProduct
