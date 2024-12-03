import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useAppDispatch } from '@/hooks/useRedux'
import { allActions } from '@/store/allActions'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
