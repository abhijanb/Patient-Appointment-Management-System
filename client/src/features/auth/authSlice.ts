import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from './auth.type'
import type { RootState } from '../../store/store'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  authChecked: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authChecked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User }>
    ) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.authChecked = true
    },
    setAuthChecked: (state) => {
      state.authChecked = true
    },
    logOut: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, setAuthChecked, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthChecked = (state: RootState) => state.auth.authChecked
