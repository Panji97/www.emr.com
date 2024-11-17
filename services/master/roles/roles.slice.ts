import { createSlice } from '@reduxjs/toolkit'
import { getAllRoles, getAllPermission, upsertRole, destroyPermission } from './roles.thunk'

interface RolesState {
    roles: any[]
    permissions: any[]
    status: 'idle' | 'loading' | 'successed' | 'failed'
    error: string | null
}

const initialState: RolesState = {
    roles: [],
    permissions: [],
    status: 'idle',
    error: null
}

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRoles.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.status = 'successed'
                state.roles = action.payload
            })
            .addCase(getAllRoles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(getAllPermission.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllPermission.fulfilled, (state, action) => {
                state.status = 'successed'
                state.permissions = action.payload
            })
            .addCase(getAllPermission.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(upsertRole.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(upsertRole.fulfilled, (state) => {
                state.status = 'successed'
            })
            .addCase(upsertRole.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(destroyPermission.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(destroyPermission.fulfilled, (state) => {
                state.status = 'successed'
            })
            .addCase(destroyPermission.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    }
})

export default rolesSlice.reducer
