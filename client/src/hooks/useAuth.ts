import { useAppSelector } from "./useRedux";


export const useAuth = () => useAppSelector(state => state.user);