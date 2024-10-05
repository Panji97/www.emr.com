import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

const token = getCookie('access_token')

export const UserService = {
    async getAllUser(page?: number, limit?: number) {
        const queryParams = new URLSearchParams()

        if (page !== undefined) queryParams.append('page', page.toString())
        if (limit !== undefined) queryParams.append('limit', limit.toString())

        const queryString = queryParams.toString()
        const url = `${BASE_MASTER}/users${queryString ? `?${queryString}` : ''}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const result = await response.json()

        return result
    }
}
