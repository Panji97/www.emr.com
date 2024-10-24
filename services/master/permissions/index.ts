import { Toast } from 'primereact/toast'
import { TreeNode } from 'primereact/treenode'
import { TreeTableSelectionKeysType } from 'primereact/treetable'
import { useEffect, useRef, useState } from 'react'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

export const PermissionService = () => {
    const toast = useRef<Toast>(null)
    const token = getCookie('access_token')
    const [permission, setPermission] = useState<TreeNode[]>([])
    const [selectedNode, setSelectedNode] = useState<TreeTableSelectionKeysType | null>(null)

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

    useEffect(() => {
        getAllMenus()
    }, [])

    let payloads = []
    for (const key in selectedNode) {
        const ids = key.split('-')
        const mparentId = ids[0]

        const payload = {
            mparent_id: Number(mparentId)
        }

        payloads.push(payload)
    }
    const upsertRoleHasPermission = () => {
        payloads.forEach(async (data) => {
            const response = await fetch(`${BASE_MASTER}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            return result
        })
    }

    return {
        permission,
        selectedNode,
        setPermission,
        setSelectedNode,
        upsertRoleHasPermission
    }
}
