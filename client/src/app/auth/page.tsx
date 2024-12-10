// app/auth/page.js
'use client'

import { AuthenticationForm } from '@/components/screens/auth/AuthenticationForm'
import { Container } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const AuthPage = () => {
	const searchParams = useSearchParams()
	const myType = searchParams.get('mode') === 'register' ? 'register' : 'login'
	const [formType, setFormType] = useState<'login' | 'register'>(myType)

	useEffect(() => {
		setFormType(myType)
	}, [myType])

	return (
		<Container size="30rem">
			<AuthenticationForm type={formType} setFormType={setFormType} />
		</Container>
	)
}

export default AuthPage
