/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useAuthService } from '@/service/auth/auth.service'
import { Toast } from 'primereact/toast'

const ForgotPasswordPage = () => {
  /**
   * *import auth service
   */
  const { toast, formData, handleChange, handleForgotPassword } =
    useAuthService()

  const { layoutConfig } = useContext(LayoutContext)

  const router = useRouter()
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  )

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: '53px' }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Forgot Password
              </div>
            </div>

            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
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

              <div className="flex align-items-center justify-content-between gap-5"></div>
              <Button
                label="Reset Password"
                className="w-full p-3 text-xl"
                onClick={handleForgotPassword}
              ></Button>
              <Button
                label="Already have an account? Login"
                severity="secondary"
                className="w-full p-button-secondary p-button-text mt-3"
                onClick={() => router.push('/auth/login')}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
