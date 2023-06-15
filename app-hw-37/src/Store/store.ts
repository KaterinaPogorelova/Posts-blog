import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { postsReducer } from './post'
import { themeReducer } from './theme'
import { searchReducer } from './search'
import { authReducer } from './auth'
import { favsPostsReducer } from './favorites'


export const store = configureStore({
	reducer: {
		posts: postsReducer,
		theme: themeReducer,
		search: searchReducer,
		auth: authReducer,
		favsPosts: favsPostsReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector