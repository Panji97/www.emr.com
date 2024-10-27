/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react'
import AppMenuitem from './AppMenuitem'
import { LayoutContext } from './context/layoutcontext'
import { MenuProvider } from './context/menucontext'
import Link from 'next/link'
import { AppMenuItem } from '@/types'
import { UserService } from '@/services/master/users'

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext)
    const { permission } = UserService()

    const model: AppMenuItem[] = permission

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    )
                })}
            </ul>
        </MenuProvider>
    )
}

export default AppMenu
