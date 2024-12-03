'use client'
import { AuthenticationForm } from '@/components/screens/auth/AuthenticationForm'
import { Container } from '@mantine/core'
import { useSearchParams } from 'next/navigation'

const AuthPage = () => {
       const searchParams = useSearchParams()
				const mode = searchParams.get('mode')

    return (
        <div>
            {mode === 'login' && <Container size="30rem">
			<AuthenticationForm type="login" />
		</Container>}
            {mode === 'register' && <Container size="30rem">
			<AuthenticationForm type="register" />
		</Container>}
        </div>
    );
};

export default AuthPage;