'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { registerUser, resetState } from '@/services/authentication/auth.slice'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()
    const { data, status, error } = useSelector((state: RootState) => state.register)

    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
    const [checked, setChecked] = useState(false)
    const { layoutConfig } = useContext(LayoutContext)
    const toast = React.useRef<Toast>(null)

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.current?.show({
                severity: 'error',
                summary: 'Passwords do not match',
                detail: 'Please check your passwords'
            })
            return
        }
        dispatch(registerUser({ email: formData.email, password: formData.password }))
    }

    useEffect(() => {
        if (status === 'successed') {
            toast.current?.show({
                severity: 'success',
                summary: 'Registration Successful',
                detail: 'Account created successfully!'
            })

            setTimeout(() => {
                router.push('/auth/login')
                dispatch(resetState())
            }, 3000)
        } else if (status === 'failed') {
            toast.current?.show({ severity: 'error', summary: 'Registration Failed', detail: error })
        }
    }, [status, error])

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
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Register</div>
                            <span className="text-600 font-medium line-height-3">Already have an account?</span>
                            <Link
                                href="/auth/login"
                                className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                            >
                                Sign In!
                            </Link>
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
                                onChange={handleInputChange}
                                placeholder="Email address"
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: '1rem' }}
                            />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password
                                inputId="password1"
                                name="password"
                                value={formData.password}
                                feedback={false}
                                onChange={handleInputChange}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            />

                            <label htmlFor="confirmPassword" className="block text-900 font-medium text-xl mb-2">
                                Confirm Password
                            </label>
                            <Password
                                inputId="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                feedback={false}
                                onChange={handleInputChange}
                                placeholder="Confirm Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="terms1"
                                        checked={checked}
                                        onChange={(e) => setChecked(e.checked ?? false)}
                                        className="mr-2"
                                    ></Checkbox>
                                    <label htmlFor="terms1">I agree to the terms and conditions</label>
                                </div>
                            </div>

                            <Button
                                label="Register"
                                className="w-full p-3 text-xl"
                                onClick={handleRegister}
                                loading={status === 'loading'}
                                disabled={!checked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
