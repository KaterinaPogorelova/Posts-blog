import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Search = {
	searchValue: string
}

const initialState: Search = {
	searchValue: ''
}

export const searchSlice = createSlice({
	name: 'Search',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		}
	}
})

export const { setSearchValue } = searchSlice.actions
export const searchReducer = searchSlice.reducer