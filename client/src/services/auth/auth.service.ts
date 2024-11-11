import axios from 'axios'
import Cookies from 'js-cookie'

import { getContentType } from '@/api/api.helper'
import { saveToStorage } from '@/services/auth/auth.helper'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axios<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data,
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + '/login/access-token',
			{ refreshToken },
			{
				headers: getContentType(),
			},
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},
}
