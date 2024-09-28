import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

const token = getCookie('access_token')

export const UserService = {
    async getAllUser(page: number, limit: number) {
        const cacheKey = `users_page_${page}_limit_${limit}`
        const cachedData = sessionStorage.getItem(cacheKey)

        // Cek jika ada data di sessionStorage
        if (cachedData) return JSON.parse(cachedData)

        // Jika tidak ada di cache, lakukan request ke server
        const response = await fetch(`${BASE_MASTER}/users?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const result = await response.json()

        // Simpan data ke sessionStorage setelah berhasil melakukan fetch
        sessionStorage.setItem(cacheKey, JSON.stringify(result))

        return result
    }
}
