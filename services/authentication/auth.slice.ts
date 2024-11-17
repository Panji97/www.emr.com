import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_AUTH } from '@/ihaaay.json'
import { handlePending, handleFulfilled, handleRejected } from '@/helpers/state-handler'
import { eraseCookie } from '@/helpers/cookies'

export interface RegisterState {
    data: any | null
    status: 'idle' | 'loading' | 'successed' | 'failed'
    error: string | null
}

export interface LoginState {
    data: any | null
    status: 'idle' | 'loading' | 'successed' | 'failed'
    error: string | null
}

export const initialRegisterState: RegisterState = {
    data: null,
    status: 'idle',
    error: null
}

export const initialLoginState: LoginState = {
    data: null,
    status: 'idle',
    error: null
}

export interface ForgotPasswordState {
    data: string | null
    status: 'idle' | 'loading' | 'successed' | 'failed'
    error: string | null
}

export const initialForgotPasswordState: ForgotPasswordState = {
    data: null,
    status: 'idle',
    error: null
}

export interface ResetPasswordState {
    status: 'idle' | 'loading' | 'successed' | 'failed'
    data: string | null
    error: string | null
}

export const initialResetPasswordState: ResetPasswordState = {
    status: 'idle',
    data: null,
    error: null
}

export interface LogoutState {
    status: 'idle' | 'loading' | 'successed' | 'failed'
    data: string | null
    error: string | null
}

export const initialLogoutState: LogoutState = {
    status: 'idle',
    data: null,
    error: null
}

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

// Register slice
export const registerSlice = createSlice({
    name: 'register',
    initialState: initialRegisterState,
    reducers: {
        resetStateRegister: (state) => {
            state.status = 'idle'
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, handlePending<RegisterState>)
            .addCase(registerUser.fulfilled, handleFulfilled<RegisterState>)
            .addCase(registerUser.rejected, handleRejected<RegisterState>)
    }
})

// Login slice
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, handlePending<LoginState>)
            .addCase(loginUser.fulfilled, handleFulfilled<LoginState>)
            .addCase(loginUser.rejected, handleRejected<LoginState>)
    }
})

export const forgotPasswordSlice = createSlice({
    name: 'forgot-password',
    initialState: initialForgotPasswordState,
    reducers: {
        resetStateForgotPassword: (state) => {
            state.status = 'idle'
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, handlePending<ForgotPasswordState>)
            .addCase(forgotPassword.fulfilled, handleFulfilled<ForgotPasswordState>)
            .addCase(forgotPassword.rejected, handlePending<ForgotPasswordState>)
    }
})

export const resetPasswordSlice = createSlice({
    name: 'reset-password',
    initialState: initialResetPasswordState,
    reducers: {
        resetStateResetPassword: (state) => {
            state.status = 'idle'
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, handlePending<ResetPasswordState>)
            .addCase(resetPassword.fulfilled, handleFulfilled<ResetPasswordState>)
            .addCase(resetPassword.rejected, handlePending<ResetPasswordState>)
    }
})

export const logoutSlice = createSlice({
    name: 'logout',
    initialState: initialLogoutState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, handlePending<LogoutState>)
            .addCase(logoutUser.fulfilled, handleFulfilled<LogoutState>)
            .addCase(logoutUser.rejected, handleRejected<LogoutState>)
    }
})

export const { resetStateRegister } = registerSlice.actions
export const { resetStateForgotPassword } = forgotPasswordSlice.actions
export const { resetStateResetPassword } = resetPasswordSlice.actions

export const registerReducer = registerSlice.reducer
export const loginReducer = loginSlice.reducer
export const forgotPasswordReducer = forgotPasswordSlice.reducer
export const resetPasswordReducer = resetPasswordSlice.reducer
export const logoutReducer = logoutSlice.reducer
