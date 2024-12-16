import { ICartItem } from '@/types/cart.interface'

export interface ICartInitialState {
	items: ICartItem[]
}

export type IAddtoCartPayload = Omit<ICartItem, 'id'>

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}
