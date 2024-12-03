'use client'

import AuthProvider from '@/providers/AuthProvider' // Импортируйте ваш AuthProvider
import { persistor, store } from '@/store'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

interface ProviderLayoutProps {
	children: React.ReactNode
	isOnlyUser?: boolean // Добавляем isOnlyUser как опциональное свойство
}

const ProviderLayout: React.FC<ProviderLayoutProps> = ({
	children,
	isOnlyUser // Деструктурируем isOnlyUser из пропсов
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider Component={{ isOnlyUser }}>
						<MantineProvider>{children}</MantineProvider>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default ProviderLayout
