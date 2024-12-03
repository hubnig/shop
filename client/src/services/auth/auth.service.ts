import { instance } from '@/api/api.interceptor'
import Cookies from 'js-cookie'
import { saveToStorage } from '@/services/auth/auth.helper'
import { IAuthResponse, IEmailPassword } from '@/store/user/auth.interface'

export const AuthService = {
	async main(
		type: 'login' | 'register',
		data: IEmailPassword
	): Promise<IAuthResponse> {
		try {
			const response = await instance.post<IAuthResponse>(`/auth/${type}`, data)

			if (response.data.accessToken) {
				saveToStorage(response.data)
			}

			return response.data
		} catch (error) {
			console.error('Error during authentication:', error)
			throw new Error('Authentication failed. Please try again.')
		}
	},

	async getNewTokens(): Promise<IAuthResponse> {
		const refreshToken = Cookies.get('refreshToken')

		if (!refreshToken) {
			throw new Error('Refresh token not found')
		}

		try {
			const response = await instance.post<IAuthResponse>(
				'/auth/login/access-token',
				{
					refreshToken
				}
			)

			if (response.data.accessToken) {
				saveToStorage(response.data)
			}

			return response.data
		} catch (error) {
			console.error('Error while refreshing tokens:', error)
			throw new Error('Failed to refresh tokens. Please log in again.')
		}
	}
}
