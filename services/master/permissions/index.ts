import { NodeService } from '@/demo/service/NodeService'
import { TreeNode } from 'primereact/treenode'
import { TreeTableSelectionKeysType } from 'primereact/treetable'
import { useEffect, useState } from 'react'

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

    const [permission, setPermission] = useState<TreeNode[]>([])
    const [selectedNode, setSelectedNode] = useState<TreeTableSelectionKeysType | null>(null)

    useEffect(() => {
        setPermission(data)
    }, [])

    return {
        data,
        permission,
        selectedNode,
        setPermission,
        setSelectedNode
    }
}
