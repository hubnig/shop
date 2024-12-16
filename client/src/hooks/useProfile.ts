import { UserService } from '@/services/user.service'
import { IFullUser } from '@/types/user.interface'
import { useQuery } from '@tanstack/react-query'

// Хук для получения профиля пользователя
export const useProfile = (id: number) => {
	const { data } = useQuery({
		queryKey: ['profile', id],
		queryFn: () => UserService.getProfile(id) 
	})

	return { profile: data  || {} as IFullUser}
}
