import { IAuthResponse, IEmailPassword } from '@/interfaces/auth.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'

// register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.main('register', data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

// login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/login',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.main('login', data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    removeFromStorage()
})

// Check authentication
export const checkAuth = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/check-auth',
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)
