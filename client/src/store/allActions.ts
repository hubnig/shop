import { cartSlice } from './cart/cart.slice'
import * as userActions from './user/user.actions'


export const allActions = {
	...userActions,
	...cartSlice.actions
}
