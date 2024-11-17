'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store' // Pastikan kamu sudah mengatur store
import { forgotPassword, resetStateForgotPassword } from '@/services/authentication/auth.slice' // Pastikan path sesuai

const ForgotPasswordPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const toast = useRef<Toast>(null)
    const { layoutConfig } = useContext(LayoutContext)

    // State lokal untuk email
    const [email, setEmail] = React.useState('')

    // Mengambil state dari Redux untuk forgot password
    const { status, error, data } = useSelector((state: RootState) => state.forgorpassword)

    // Fungsi untuk meng-handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    // Meng-handle submit forgot password
    const handleForgotPassword = () => {
        if (email) {
            dispatch(forgotPassword(email))
        }
    }

    // Efek untuk menampilkan notifikasi berdasarkan status
    useEffect(() => {
        if (status === 'successed') {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Reset password email sent successfully!'
            })

            dispatch(resetStateForgotPassword())
        } else if (status === 'failed') {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error || 'Failed to send reset password email.'
            })
        }
    }, [status, error])

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    )

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img
                    src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`}
                    alt="Sakai logo"
                    className="mb-5 w-6rem flex-shrink-0"
                />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Avatar" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Forgot Password</div>
                        </div>
                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText
                                id="email1"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: '1rem' }}
                            />

                            <div className="flex align-items-center justify-content-between"></div>
                            <Button
                                label="Send Reset Password"
                                className="w-full p-3 text-xl"
                                onClick={handleForgotPassword}
                                loading={status === 'loading'} // Menambahkan loading saat status "loading"
                            ></Button>
                            <div className="flex justify-content-center mt-3">
                                <span className="text-600 font-medium line-height-3">Already have an account?</span>
                                <Link
                                    href="/auth/login"
                                    className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                                >
                                    Sign in here!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
