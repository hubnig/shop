'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
	Anchor,
	Button,
	Center,
	Checkbox,
	Divider,
	Group,
	Loader,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput
} from '@mantine/core'
import { upperFirst } from '@mantine/hooks'
import { KeySquare, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { GoogleButton } from './GoogleButton'
import { TwitterButton } from './TwitterButton'

interface FormValues {
	email: string
	name: string
	password: string
	terms: boolean
}

interface IProps {
	type: 'login' | 'register'
	setFormType: (type: 'login' | 'register') => void // Функция для изменения типа формы
}

export function AuthenticationForm({ type, setFormType }: IProps) {
	const { isLoading } = useAuth()
	const { login, register } = useActions()
	useAuthRedirect()

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (data: FormValues) => {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}
	}

	return isLoading ? (
		<Center h={410}>
			<Loader />
		</Center>
	) : (
		<Paper radius="md" p="xl" withBorder>
			<Text size="lg" fw={500}>
				Welcome to Mantine, {type} with
			</Text>

			<Group grow mb="md" mt="md">
				<GoogleButton radius="xl">Google</GoogleButton>
				<TwitterButton radius="xl">Twitter</TwitterButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack>
					{type === 'register' && (
						<TextInput
							label="Name"
							leftSectionPointerEvents="none"
							leftSection={<User />}
							placeholder="Your name"
							{...formRegister('name', { required: 'Name is required' })}
							error={errors.name && 'Name is required'}
							radius="md"
						/>
					)}

					<TextInput
						required
						label="Email"
						leftSectionPointerEvents="none"
						leftSection={<Mail />}
						placeholder="hello@mantine.dev"
						{...formRegister('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/,
								message: 'Invalid email'
							}
						})}
						error={errors.email?.message}
						radius="md"
					/>

					<PasswordInput
						required
						label="Password"
						leftSectionPointerEvents="none"
						leftSection={<KeySquare />}
						placeholder="Your password"
						{...formRegister('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password should include at least 6 characters'
							}
						})}
						error={errors.password?.message}
						radius="md"
					/>

					{type === 'register' && (
						<Checkbox
							label="I accept terms and conditions"
							{...formRegister('terms', { required: true })}
							error={errors.terms && 'You must accept the terms'}
						/>
					)}
				</Stack>

				<Group justify="space-between" mt="xl">
					<Anchor
						component="button"
						type="button"
						c="dimmed"
						onClick={() => setFormType(type === 'login' ? 'register' : 'login')}
						size="xs"
					>
						{type === 'register'
							? 'Already have an account? Login'
							: "Don't have an account? Register"}
					</Anchor>
					<Button type="submit" radius="xl" loading={isLoading}>
						{upperFirst(type)}
					</Button>
				</Group>
			</form>
		</Paper>
	)
}
