import { BASE_AUTH } from '@/ihaaay.json'

export const AuthenticationService = {
    async login(email: string, password: string) {
        try {
            const response = await fetch(`${BASE_AUTH}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            return data.data
        } catch (error) {
            console.error('Error:', error)
            return null // Handling error, bisa disesuaikan
        }
    }
}
