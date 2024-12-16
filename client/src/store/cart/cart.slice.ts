import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	IAddtoCartPayload,
	ICartInitialState,
	IChangeQuantityPayload
} from './cart.type'

const initialState: ICartInitialState = {
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddtoCartPayload>) => {
			const isExist = state.items.some(
				item => item.product.id === action.payload.product.id
			)

			if (!isExist)
				state.items.push({ ...action.payload, id: state.items.length })
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) {
				if (type === 'plus') {
					item.quantity++
				} else {
					item.quantity--
				}
			}
		},

		reset: state => {
			state.items = []
		}
	}
})
