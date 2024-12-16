import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import { carouselSlice } from './slices/carouselSlice'
// import { cartSlice } from './slices/cartSlice'
import { userSlice } from './user/user.slice'
import { cartSlice } from './cart/cart.slice'

const persistConfig = {
	key: 'game-shop',
	storage,
	whitelist: ['user', 'cart'],
}

const rootReducer = combineReducers({
	// carousel: carouselSlice.reducer,
	cart: cartSlice.reducer,
	user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)

// From redux docs
// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']