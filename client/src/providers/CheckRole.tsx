'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from './auth-page.type'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		// Если требуется только пользователь и он не авторизован, перенаправляем на страницу входа
		if (isOnlyUser && !user) {
			router.replace('/login')
		}
	}, [isOnlyUser, user, router])

	// Если пользователь авторизован и требуется только пользователь, отображаем дочерние элементы
	if (isOnlyUser && user) {
		return <>{children}</>
	}

	// Если ни одно из условий не выполнено, возвращаем null
	return null
}

export default CheckRole
