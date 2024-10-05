import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

const token = getCookie('access_token')

export const MenusService = {
    async getAll() {
        const response = await fetch(`${BASE_MASTER}/menus`, {
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
