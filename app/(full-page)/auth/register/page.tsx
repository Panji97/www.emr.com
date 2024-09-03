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

const RegisterPage = () => {
  /**
   * *import auth service
   */
  const { toast, formData, handleChange, handleRegister } = useAuthService()

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
                Get Started
              </div>
              <span className="text-600 font-medium">
                Unlock a world of possibilities by registering today
              </span>
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

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <Password
                inputId="password1"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
              ></Password>

              <div className="flex align-items-center justify-content-between gap-5"></div>
              <Button
                label="Register"
                className="w-full p-3 text-xl"
                onClick={handleRegister}
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

export default RegisterPage
