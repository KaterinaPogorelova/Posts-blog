import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ThemeType = {
	themeColor: 'light' | 'dark'
}
const initialState: ThemeType = {
	themeColor: 'light'
}
export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
			state.themeColor = action.payload
		}
	}
})

export const { changeTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer