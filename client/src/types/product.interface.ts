import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	price: number
	images: string[]
	reviews: IReview[]
	category: ICategory
	createdAt: string
	description: string
}

export interface IProductDetails {
	product: IProduct
}
