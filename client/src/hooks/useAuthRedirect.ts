import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useRouter } from 'next/navigation'

export const useAuthRedirect = () => {
  const { user } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    if (user) replace('/')
  }, [user])
}