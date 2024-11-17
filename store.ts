import { configureStore } from '@reduxjs/toolkit'
import {
    forgotPasswordReducer,
    loginReducer,
    logoutReducer,
    registerReducer,
    resetPasswordReducer
} from './services/authentication/auth.slice'

const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        forgorpassword: forgotPasswordReducer,
        resetpassword: resetPasswordReducer,
        logout: logoutReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
