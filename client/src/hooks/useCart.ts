import { useAppSelector } from "./useRedux";

export const useCart = () => useAppSelector(state=> state.cart)