
import { IAuthData, IAuthResponse, IRegisterData } from '@/interfaces/auth.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'
import { errorCatch } from '../api/api.helper'

export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.register('register', data)
            toastr.success('Успешно', 'Вход выполнен')
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<IAuthResponse, IAuthData>(
    'auth/login',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.login('login', data)
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
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/access-token',
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data
        } catch (error) {
            if (errorCatch(error) === 'jwt expired') {
                thunkApi.dispatch
            }
            return thunkApi.rejectWithValue(error)
        }
    }
)
