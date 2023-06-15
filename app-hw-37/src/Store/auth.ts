import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { regUser, createJWT, User, ActivateUser, activateUser, TokenUser, CheckUser, checkMe } from '../handleAuth'

type Auth = {
	isAuthorised: boolean | null,
	userLogin: string,
	userPassword: string,
	userId: number,
	isActivated: boolean | null
}

type Tokens = {
	access: string,
	refresh: string
}
type Actication = {
	uid: string,
	token: string
}
const initialState: Auth = {
	isAuthorised: null,
	userLogin: '',
	userPassword: '',
	userId: 0,
	isActivated: null
}

export const authSlice = createSlice({
	name: 'Authorization',
	initialState,
	reducers: {
		setUserLogin: (state, action: PayloadAction<string>) => {
			state.userLogin = action.payload
		},
		setUserPassword: (state, action: PayloadAction<string>) => {
			state.userPassword = action.payload
		},
		handleLogOut: (state) => {
			state.isAuthorised = false
			localStorage.clear()
		},
	}, extraReducers(builder) {
		builder.addCase(handleAuthThunk.fulfilled, (state, action: PayloadAction<Tokens>) => {
			if (!action.payload.access) {
				state.isAuthorised = false
			} else {
				state.isAuthorised = true
				localStorage.setItem('accessToken', action.payload.access)
				localStorage.setItem('refreshToken', action.payload.refresh)
			}
		})
			.addCase(checkMeThunk.fulfilled, (state, action: PayloadAction<CheckUser>) => {
				state.isAuthorised = true
				state.userLogin = action.payload.username
			})
			.addCase(getActivated.fulfilled, (state, action: PayloadAction<Actication>) => {
				if (!action.payload.uid) {
					state.isActivated = false
				} else {
					state.isActivated = true
				}
			})
	}
})

export const { handleLogOut, setUserLogin, setUserPassword } = authSlice.actions
export const authReducer = authSlice.reducer

export const getAuthThunk = createAsyncThunk('auth/postUser', async (user: User) => {
	const newUser = await regUser(user)
	return newUser
})

export const getActivated = createAsyncThunk('auth/activateUser', async (user: ActivateUser) => {
	const activation = await activateUser(user)
	return activation
})

export const handleAuthThunk = createAsyncThunk('auth/handleAuth', async (user: TokenUser) => {
	const tokens = await createJWT({ email: user.email, password: user.password })
	return tokens
})

export const checkMeThunk = createAsyncThunk('auth/checkMe', async () => {
	const userinfo = await checkMe()
	return userinfo
})