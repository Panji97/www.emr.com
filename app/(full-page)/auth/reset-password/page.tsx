'use client'
import React, { useContext, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { resetPassword, resetStateResetPassword } from '@/services/authentication/auth.slice'

const ResetPasswordPage = () => {
    const router = useRouter()
    const toast = React.useRef<Toast>(null)
    const dispatch: AppDispatch = useDispatch()
    const { status } = useSelector((state: RootState) => state.resetpassword)

    const searchParams = useSearchParams()
    const tokenresetpassword = searchParams.get('tokenresetpassword')
    const email = searchParams.get('email')

    const [formData, setFormData] = React.useState({
        password: '',
        tokenresetpassword: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        if (status === 'successed') {
            toast.current?.show({
                severity: 'success',
                summary: 'Password Reset Successful',
                detail: 'You can now login with your new password.'
            })

            setTimeout(() => {
                router.push('/auth/login')
                dispatch(resetStateResetPassword())
            }, 3000)
        } else if (status === 'failed') {
            toast.current?.show({ severity: 'error', summary: 'Reset Failed', detail: 'Please try again later.' })
        }
    }, [status])

    const handleResetPassword = () => {
        if (formData.password && formData.tokenresetpassword) {
            dispatch(
                resetPassword({
                    password: formData.password,
                    tokenresetpassword: formData.tokenresetpassword,
                    email: formData.email
                })
            )
        }
    }

    const { layoutConfig } = useContext(LayoutContext)

    // Set tokenresetpassword and email in formData on component mount
    useEffect(() => {
        if (tokenresetpassword && email) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email,
                tokenresetpassword
            }))
        }
    }, [tokenresetpassword, email, setFormData])

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
                            <div className="text-900 text-3xl font-medium mb-3">Reset Password</div>
                        </div>
                        <div>
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                New Password
                            </label>
                            <Password
                                inputId="password1"
                                name="password"
                                value={formData.password}
                                feedback={false}
                                onChange={handleChange}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
                            <Button
                                label="Reset Password"
                                className="w-full p-3 text-xl"
                                onClick={handleResetPassword}
                                loading={status === 'loading'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage
