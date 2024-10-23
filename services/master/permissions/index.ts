import { Toast } from 'primereact/toast'
import { TreeNode } from 'primereact/treenode'
import { TreeTableSelectionKeysType } from 'primereact/treetable'
import { useEffect, useRef, useState } from 'react'
import { BASE_MASTER } from '@/ihaaay.json'
import { getCookie } from '@/helpers/cookies'

export const PermissionService = () => {
    const data = [
        {
            key: '1',
            data: {
                name: 'Cloud',
                size: '20kb',
                type: 'Folder'
            },
            children: [
                {
                    key: '1-0',
                    data: {
                        name: 'backup-1.zip',
                        size: '10kb',
                        type: 'Zip'
                    }
                },
                {
                    key: '1-1',
                    data: {
                        name: 'backup-2.zip',
                        size: '10kb',
                        type: 'Zip'
                    }
                }
            ]
        }
    ]

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

    return {
        data,
        permission,
        selectedNode,
        setPermission,
        setSelectedNode
    }
}
