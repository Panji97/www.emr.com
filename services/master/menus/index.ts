import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

const token = getCookie('access_token')

export const MenusService = {
    async getParent() {
        try {
            const response = await fetch(`${BASE_MASTER}/menus/parent`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            return result
        } catch (error) {
            console.error(error)
        }
    },

    async getMain(header_id: number) {
        try {
            const response = await fetch(`${BASE_MASTER}/menus/main/${header_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            return result
        } catch (error) {
            console.error(error)
        }
    },

    async getChild(menu_id: number) {
        try {
            const response = await fetch(`${BASE_MASTER}/menus/child/${menu_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            return result
        } catch (error) {
            console.error(error)
        }
    }
}
