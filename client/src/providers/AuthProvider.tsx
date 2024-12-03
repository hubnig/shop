'use client'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import {
	getAccessTokenStorage,
	getRefreshTokenStorage
} from '@/services/auth/auth.helper'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from './auth-page.type'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	const pathname = usePathname()

	useEffect(() => {
		const accessToken = getAccessTokenStorage()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = getRefreshTokenStorage()
		if (!refreshToken && user) logout()
	}, [pathname])

	return isOnlyUser ? (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	) : (
		<>{children}</>
	)
}

export default AuthProvider
