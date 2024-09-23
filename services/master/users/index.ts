import { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

export const useUserService = () => {
    const toast = useRef<Toast>(null)
    const token = getCookie('access_token')

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

            return result
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    return {
        toast,
        getAllUser
    }
}
