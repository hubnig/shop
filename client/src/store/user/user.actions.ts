import { createAsyncThunk } from '@reduxjs/toolkit'

import { errorCatch } from '@/api/api.helper'

import { removeTokensStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { IAuthResponse, IEmailPassword } from './auth.interface'

// register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async (data, thunkAPI) => {
		try {
			const response = await AuthService.main('register', data)
			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(errorCatch(error))
		}
	}
)

//login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async (data, thunkAPI) => {
		try {
			const response = await AuthService.main('login', data)
			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(errorCatch(error))
		}
	}
)

//logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		removeTokensStorage()
	} catch (error) {
		return thunkAPI.rejectWithValue(errorCatch(error))
	}
})

//checkAuth
export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.getNewTokens()
			return response
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkAPI.dispatch(logout())
			}
			return thunkAPI.rejectWithValue(errorCatch(error))
		}
	}
)
