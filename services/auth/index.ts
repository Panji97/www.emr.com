import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { eraseCookie, setCookie } from '@/helpers/cookies'
import { useRouter } from 'next/navigation'
import { BASE_AUTH } from '@/ihaaay.json'

export const useAuthService = () => {
    const toast = useRef<Toast>(null)
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        token: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
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
        const response = await fetch(`${BASE_AUTH}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()

        if (response.ok) {
            toast.current?.show({
                severity: 'success',
                summary: result.message,
                detail: result.detail,
                life: 5000
            })

            setInterval(() => {
                router.push('/auth/login')
            }, 2000)
        } else {
            toast.current?.show({
                severity: 'error',
                summary: result.error,
                detail: result.message,
                life: 5000
            })
        }
    }

    const handleLogout = async () => {
        toast.current?.show({
            severity: 'success',
            summary: 'success',
            detail: 'Success logout account',
            life: 2000
        })

        eraseCookie('token')
        setInterval(() => {
            window.location.reload()
            router.push('/auth/login')
        }, 2000)
    }

    const handleForgotPassword = async () => {
        const response = await fetch(`${BASE_AUTH}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json()

        if (response.ok) {
            toast.current?.show({
                severity: 'success',
                summary: result.message,
                detail: result.detail,
                life: 2000
            })

            setInterval(() => {
                router.push('/auth/login')
            }, 2000)
        } else {
            toast.current?.show({
                severity: 'error',
                summary: result.error,
                detail: result.message,
                life: 5000
            })
        }
    }

    const handleResetPassword = async () => {
        if (formData.password !== formData.confirm_password) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Passwords do not match',
                life: 5000
            })
            return
        }

        const response = await fetch(`${BASE_AUTH}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json()

        if (response.ok) {
            toast.current?.show({
                severity: 'success',
                summary: result.message,
                detail: result.detail,
                life: 2000
            })

            setInterval(() => {
                router.push('/auth/login')
            }, 2000)
        } else {
            toast.current?.show({
                severity: 'error',
                summary: result.error,
                detail: result.message,
                life: 5000
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
