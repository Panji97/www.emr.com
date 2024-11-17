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

export interface ForgotPasswordState {
    data: string | null
    status: 'idle' | 'loading' | 'successed' | 'failed'
    error: string | null
}

export interface ResetPasswordState {
    status: 'idle' | 'loading' | 'successed' | 'failed'
    data: string | null
    error: string | null
}

export interface LogoutState {
    status: 'idle' | 'loading' | 'successed' | 'failed'
    data: string | null
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

export const initialForgotPasswordState: ForgotPasswordState = {
    data: null,
    status: 'idle',
    error: null
}

export const initialResetPasswordState: ResetPasswordState = {
    status: 'idle',
    data: null,
    error: null
}

export const initialLogoutState: LogoutState = {
    status: 'idle',
    data: null,
    error: null
}
