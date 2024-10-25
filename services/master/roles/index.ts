import React, { useEffect, useRef, useState } from 'react'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'
import { Toast } from 'primereact/toast'
import { Roles } from './roles.interface'
import { OverlayPanel } from 'primereact/overlaypanel'
import { DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { TreeNode } from 'primereact/treenode'
import { TreeTableSelectionKeysType } from 'primereact/treetable'

export const RolesService = () => {
    const toast = useRef<Toast>(null)
    const opRoles = useRef<OverlayPanel>(null)
    const token = getCookie('access_token')
    const [roles, setRoles] = useState<Roles[]>()
    const [selectRoles, setSelectRoles] = useState<Roles | null>(null)
    const [permission, setPermission] = useState<TreeNode[]>([])
    const [selectedNode, setSelectedNode] = useState<TreeTableSelectionKeysType | null>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        name: ''
    })

    useEffect(() => {
        getAllRoles()
        getAllMenus()
    }, [selectRoles])

    const getAllRoles = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()

            setRoles(result.data)
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const upsertRole = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (result.data) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                getAllRoles()
            } else {
                toast.current?.show({
                    severity: 'error',
                    detail: result.message
                })
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        let _roles: Roles[] = [...(roles || [])]
        let { newData, index } = e

        _roles[index] = newData as Roles

        setRoles(_roles)

        try {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            })

            const result = await response.json()

            if (response.ok) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })
            } else {
                toast.current?.show({
                    severity: 'error',
                    detail: result.message
                })
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const getAllMenus = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/menus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            setPermission(result.data)
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    return {
        toast,
        roles,
        visible,
        opRoles,
        formData,
        permission,
        selectRoles,
        selectedNode,
        setRoles,
        upsertRole,
        setVisible,
        getAllMenus,
        setFormData,
        getAllRoles,
        setSelectRoles,
        setSelectedNode,
        onRowEditComplete
    }
}
