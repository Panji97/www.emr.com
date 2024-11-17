import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

const token = getCookie('access_token')

export const getAllRoles = createAsyncThunk('roles/getAll', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_MASTER}/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch roles')
        return result.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const getAllPermission = createAsyncThunk(
    'roles/getAllPermission',
    async (roleId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles/permission/${roleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.message || 'Failed to fetch permissions')
            return result.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const upsertRole = createAsyncThunk(
    'roles/upsert',
    async ({ formData, selectedNode }: { formData: any; selectedNode: any }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ formData, selectedNode })
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.message || 'Failed to upsert role')
            return result
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const destroyPermission = createAsyncThunk(
    'roles/destroyPermission',
    async (roleId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles/${roleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.message || 'Failed to delete permission')
            return result
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
