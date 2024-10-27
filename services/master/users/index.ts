import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'
import { useEffect, useState } from 'react'
import { AppMenuItem } from '@/types'

const token = getCookie('access_token')

export const UserService = () => {
    const [permission, setPermission] = useState<AppMenuItem[]>([])

    useEffect(() => {
        getUserPermission()
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

    return {
        permission
    }
}
