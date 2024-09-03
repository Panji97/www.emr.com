/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useContext, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { classNames } from 'primereact/utils'
import { useAuthService } from '@/service/auth/auth.service'
import { Toast } from 'primereact/toast'
import { useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  /**
   * *import auth service
   */
  const { toast, formData, setFormData, handleChange, handleResetPassword } =
    useAuthService()

  // Set token and email in formData on component mount
  useEffect(() => {
    if (token && email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        token,
        email
      }))
    }
  }, [token, email, setFormData])

  const { layoutConfig } = useContext(LayoutContext)

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
                Reset Password
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-900 font-medium text-xl mb-2"
              >
                New Password
              </label>
              <Password
                inputId="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                toggleMask
                className="w-full mb-5"
                feedback={false}
                inputClassName="w-full p-3 md:w-30rem"
              ></Password>
              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Confirm New Password
              </label>
              <Password
                inputId="password1"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm New Password"
                toggleMask
                className="w-full mb-5"
                feedback={false}
                inputClassName="w-full p-3 md:w-30rem"
              ></Password>

              <div className="flex align-items-center justify-content-between gap-5"></div>
              <Button
                label="Confirm"
                className="w-full p-3 text-xl"
                onClick={handleResetPassword}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
