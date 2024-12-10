import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './auth.interface'
import { checkAuth, login, logout, register } from './user.actions'
import { getLocalStorage } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getLocalStorage('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.rejected, state => {
				state.isLoading = false
			})
			.addCase(checkAuth.pending, state => {
				state.isLoading = true
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(checkAuth.rejected, state => {
				state.isLoading = false
			})
			// .addCase(toggleFavorite.fulfilled, (state, action) => {
			// 	const productId = action.payload // Получаем ID продукта из действия

			// 	if (state.user) {
			// 		const isFavorite = state.user.favorites.includes(productId)
			// 		if (isFavorite) {
			// 			// Если продукт уже в избранном — удаляем его
			// 			state.user.favorites = state.user.favorites.filter(
			// 				id => id !== productId
			// 			)
			// 		} else {
			// 			// Если продукта нет в избранном — добавляем его
			// 			state.user.favorites.push(productId)
			// 		}
			// 	}
			// })
	}
})
