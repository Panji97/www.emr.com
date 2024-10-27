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
    const [rolePermission, setrolePermission] = useState<TreeNode[]>([])
    const [selectedNode, setSelectedNode] = useState<TreeTableSelectionKeysType | null>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const [visiblePermission, setVisiblePermission] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        id: '',
        name: ''
    })

    useEffect(() => {
        getAllRoles()
        getAllMenus()
        getAllPermission()
    }, [selectRoles])

    useEffect(() => {
        if (roles && roles.length > 0) {
            if (visible) {
                setSelectRoles(null)
            } else if (!selectRoles) {
                setSelectRoles(roles[0])
            }
        }
    }, [roles, visible, visiblePermission, selectRoles])

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

    const getAllPermission = async () => {
        try {
            if (selectRoles) {
                const response = await fetch(`${BASE_MASTER}/roles/permission/${selectRoles?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })

                const result = await response.json()
                setrolePermission(result.data)
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                detail: error.message
            })
        }
    }

    const upsertRole = async () => {
        try {
            if (selectRoles) {
                formData.id = String(selectRoles.id)
                formData.name = String(selectRoles.name) || formData.name
            }

            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ formData, selectedNode })
            })

            const result = await response.json()

            if (response.ok) {
                toast.current?.show({
                    severity: 'success',
                    detail: result.message
                })

                getAllRoles()
                getAllMenus()
                getAllPermission()
                setFormData({
                    id: '',
                    name: ''
                })
                setSelectedNode(null)
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

    const destroyPermission = async () => {
        try {
            const response = await fetch(`${BASE_MASTER}/roles/${selectRoles?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            if (response.ok) {
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

    return {
        toast,
        roles,
        visible,
        opRoles,
        formData,
        permission,
        selectRoles,
        selectedNode,
        rolePermission,
        visiblePermission,
        setRoles,
        upsertRole,
        setVisible,
        getAllMenus,
        setFormData,
        getAllRoles,
        setSelectRoles,
        setSelectedNode,
        destroyPermission,
        onRowEditComplete,
        setVisiblePermission
    }
}
