import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_AUTH } from '@/ihaaay.json'
import { eraseCookie } from '@/helpers/cookies'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_AUTH}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const result = await response.json()

            // Memeriksa jika status respons adalah "failed" dan mengirimkan pesan error.
            if (!response.ok || result.status === 'failed') {
                return rejectWithValue(result.message || 'Register failed')
            }

            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_AUTH}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const result = await response.json()

            // Memeriksa jika status respons adalah "failed" dan mengirimkan pesan error.
            if (!response.ok || result.status === 'failed') {
                return rejectWithValue(result.message || 'Login failed')
            }

            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_AUTH}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })

        const result = await response.json()

        if (!response.ok || result.status === 'failed') {
            return rejectWithValue(result.message || 'Forgot Password failed')
        }

        return result
    } catch (error) {
        return rejectWithValue((error as Error).message)
    }
})

// Reset Password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (userData: { password: string; tokenresetpassword: string; email: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_AUTH}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const result = await response.json()

            if (!response.ok || result.status === 'failed') {
                return rejectWithValue(result.message || 'Reset Password failed')
            }

            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        sessionStorage.clear()
        eraseCookie('access_token')

        return 'Logout successful'
    } catch (error) {
        return rejectWithValue((error as Error).message)
    }
})
