import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Post } from '../getPosts'
type FavsPostsState = { favPosts: Post[] }
const initialState: FavsPostsState = { favPosts: [] }

export const favsPostsSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		setFavourites: (state, action: PayloadAction<Post>) => {
			state.favPosts = [...state.favPosts, action.payload]
		},
		removeFromFavourites: (state, action: PayloadAction<Post>) => {
			const newPosts = state.favPosts.filter((post) => post.id !== action.payload.id)
			state.favPosts = newPosts
		},
		increaseLikes: (state, action: PayloadAction<number>) => {
			const likedPost = state.favPosts.find((post) => post.id === action.payload)
			if (!likedPost) return
			likedPost.likes = likedPost.likes ? likedPost.likes + 1 : 1
		},
		increaseDislikes: (state, action: PayloadAction<number>) => {
			const dislikedPost = state.favPosts.find((post) => post.id === action.payload)
			if (!dislikedPost) return
			dislikedPost.dislikes = dislikedPost.dislikes ? dislikedPost.dislikes + 1 : 1
		},
	}
})

export const { setFavourites, removeFromFavourites, increaseLikes, increaseDislikes } = favsPostsSlice.actions
export const favsPostsReducer = favsPostsSlice.reducer