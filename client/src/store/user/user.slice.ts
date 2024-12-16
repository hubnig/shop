import { getLocalStorage } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './auth.interface'
import { checkAuth, login, logout, register } from './user.actions'

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
	}
})
