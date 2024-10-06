'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const MenuDemo = ({ children }: any) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const router = useRouter()
    const pathname = usePathname()

    const checkActiveIndex = useCallback(() => {
        const paths = pathname.split('/')
        const currentPath = paths[paths.length - 1]

        switch (currentPath) {
            case 'seat':
                setActiveIndex(1)
                break
            case 'payment':
                setActiveIndex(2)
                break
            case 'confirmation':
                setActiveIndex(3)
                break
            default:
                break
        }
    }, [pathname])

    const wizardItems = [{ label: 'Users', command: () => router.push('/uikit/menu/users') }]

    useEffect(() => {
        checkActiveIndex()
    }, [checkActiveIndex])

    useEffect(() => {
        const ulElement = document.querySelector('.p-tabmenu-nav')
        if (ulElement) {
            ;(ulElement as HTMLElement).style.display = 'flex'
            ;(ulElement as HTMLElement).style.justifyContent = 'space-between'
        }
    }, [])

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <TabMenu
                        model={wizardItems}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    />
                    {pathname === '/uikit/menu' ? (
                        <div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl" />
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MenuDemo
