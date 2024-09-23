'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import { useAuthService } from '@/services/auth'

const ForgotPasswordPage = () => {
    /**
     * use service
     */
    const { toast, router, formData, handleChange, handleRegister } = useAuthService()
    const { layoutConfig } = useContext(LayoutContext)

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
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: '1rem' }}
                            />

                            <div className="flex align-items-center justify-content-between"></div>
                            <Button
                                label="Send Reset Password"
                                className="w-full p-3 text-xl"
                                onClick={handleRegister}
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
