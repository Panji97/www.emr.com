'use client'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'
import { useEffect, useRef, useState } from 'react'
import { AppMenuItem } from '@/types'
import { Toast } from 'primereact/toast'

const token = getCookie('access_token')

export const UserService = () => {
    const toast = useRef<Toast>(null)
    const [permission, setPermission] = useState<AppMenuItem[]>([])
    const [user, setUser] = useState()
    const [roles, setRoles] = useState([])

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

            let roleName: any = []
            for (let item of result.data) {
                roleName.push(item.name)
            }

            setRoles(roleName)
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    return {
        user,
        roles,
        permission
    }
}
