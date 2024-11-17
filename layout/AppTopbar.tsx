/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { classNames } from 'primereact/utils'
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { AppTopbarRef } from '@/types'
import { LayoutContext } from './context/layoutcontext'
import { Toast } from 'primereact/toast'
import { logoutUser } from '@/services/authentication/auth.slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { useRouter } from 'next/navigation'

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const toast = React.useRef<Toast>(null)

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap() // Menggunakan unwrap untuk menangani error langsung
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Logged out successfully' })

            setInterval(() => {
                window.location.reload()
                router.push('/auth/login')
            }, 1000)
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Logout failed' })
        }
    }
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
    const menubuttonRef = useRef(null)
    const topbarmenuRef = useRef(null)
    const topbarmenubuttonRef = useRef(null)

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }))

    return (
        <div className="layout-topbar">
            <Toast ref={toast} />
            <Link href="/" className="layout-topbar-logo">
                <img
                    src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
                    width="47.22px"
                    height={'35px'}
                    alt="logo"
                />
                <span>SAKAI</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible
                })}
            >
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={handleLogout}>
                    <i className="pi pi-sign-out"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
})

AppTopbar.displayName = 'AppTopbar'

export default AppTopbar
