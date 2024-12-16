import { useProfile } from '@/hooks/useProfile'
import { useAppSelector } from '@/hooks/useRedux'
import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, HeartPulseIcon } from 'lucide-react'
import React from 'react'

const AddToFavoriteButton: React.FC<{ productId: number }> = ({ productId }) => {
  const user = useAppSelector(state => state.user.user)
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { profile } = user?.id ? useProfile(+user.id) : { profile: null }

  const { invalidateQueries } = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => UserService.toggleFavorites(productId),
    onSuccess: () => invalidateQueries({ queryKey: ['profile', user?.id] }),
  })

  const isExist = profile?.favorites.some(favorite => favorite.id === productId)


	return (
		<span className="cursor-pointer" onClick={() => mutate()}>
			{isExist ? <Heart /> : <HeartPulseIcon />}
		</span>
	)
}

export default AddToFavoriteButton

