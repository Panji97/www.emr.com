import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { eraseCookie, setCookie } from '@/helpers/cookies'
import { useRouter } from 'next/navigation'
import { BASE_AUTH, BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

export const useAuthService = () => {
    const toast = useRef<Toast>(null)
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        tokenresetpassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const userPermission = async (token: any) => {
        try {
            const response = await fetch(`${BASE_MASTER}/users/roles`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            setCookie('menu', JSON.stringify(result), 7)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_AUTH}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (result.data) {
                setCookie('access_token', result.data, 7)

                const token = getCookie('access_token')
                if (token) await userPermission(token)

                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                router.push('/')
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

    const handleRegister = async () => {
        try {
            const response = await fetch(`${BASE_AUTH}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()

            if (result.data) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                setInterval(() => {
                    window.location.reload()
                    router.push('/auth/login')
                }, 1000)
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

    const handleLogout = async () => {
        toast.current?.show({
            severity: 'success',
            detail: 'Success logout account'
        })

        sessionStorage.clear()
        eraseCookie('access_token')

        setInterval(() => {
            window.location.reload()
            router.push('/auth/login')
        }, 1000)
    }

    const handleForgotPassword = async () => {
        try {
            const response = await fetch(`${BASE_AUTH}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (result.data) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                setInterval(() => {
                    router.push('/auth/login')
                }, 2000)
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

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`${BASE_AUTH}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            eraseCookie('access_token')

            if (result.data) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                setInterval(() => {
                    router.push('/auth/login')
                }, 2000)
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
        toast,
        router,
        formData,
        setFormData,
        handleChange,
        handleLogin,
        handleRegister,
        handleLogout,
        handleForgotPassword,
        handleResetPassword
    }
}
