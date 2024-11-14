'use client'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'
import { useEffect, useRef, useState } from 'react'
import { AppMenuItem } from '@/types'
import { Toast } from 'primereact/toast'
import { DataTableRowEditCompleteEvent } from 'primereact/datatable'

const token = getCookie('access_token')

export const UserService = () => {
    const toast = useRef<Toast>(null)
    const [permission, setPermission] = useState<AppMenuItem[]>([])
    const [user, setUser] = useState()
    const [roles, setRoles] = useState([])
    const [selectRoles, setSelectRoles] = useState()

    useEffect(() => {
        getAllUser()
        getUserPermission()
        getAllRoles()
    }, [])

    const getUserPermission = async () => {
        const response = await fetch(`${BASE_MASTER}/users/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const result = await response.json()

        setPermission(result)
    }

    const getAllUser = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            setUser(result.data)
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const getAllRoles = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            setRoles(result.data)
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        const dataSelectRoles: any = roles.find((item: any) => item.name === selectRoles)

        try {
            const response = await fetch(`${BASE_MASTER}/users/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: e.data.id,
                    role_id: dataSelectRoles.id
                })
            })

            const result = await response.json()

            if (response.ok) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })
            } else {
                toast.current?.show({
                    severity: 'error',
                    detail: result.message
                })
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    return {
        user,
        toast,
        roles,
        permission,
        setSelectRoles,
        onRowEditComplete
    }
}
