'use client'
import React, { useEffect, useState } from 'react'
import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { NodeService } from '@/demo/service/NodeService'

const Modules = () => {
    const [nodes, setNodes] = useState([])

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" />

                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    useEffect(() => {
        NodeService.getFilesystem().then((data: any) => setNodes(data))
    }, [])

    const header1 = renderHeader1()

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <TreeTable header={header1} value={nodes} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>
        </div>
    )
}

export default Modules
