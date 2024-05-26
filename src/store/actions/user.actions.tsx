
import { IAuthResponse, IEmailPassword } from '@/interfaces/auth.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'
import { errorCatch } from '../api/api.helper'
import { useRouter } from 'next/navigation'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.main('register', data)
            toastr.success('Успешно', 'Вход выполнен')
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

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
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
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
