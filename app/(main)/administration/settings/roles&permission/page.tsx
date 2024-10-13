'use client'
import { NodeService } from '@/demo/service/NodeService'
import { ProductService } from '@/demo/service/ProductService'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { ListBox } from 'primereact/listbox'
import { TreeNode } from 'primereact/treenode'
import { TreeTable, TreeTableSelectionEvent, TreeTableSelectionKeysType } from 'primereact/treetable'
import React, { useEffect, useState } from 'react'

const RolesPermissions = () => {
    const [products, setProducts] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [nodes, setNodes] = useState<TreeNode[]>([])
    const [selectedNodeKeys, setSelectedNodeKeys] = useState<TreeTableSelectionKeysType | null>(null)
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ]

    useEffect(() => {
        NodeService.getFilesystem().then((data) => setNodes(data))
        ProductService.getProducts().then((data: any) => setProducts(data))
    }, [])
    return (
        <div className="grid p-fluid">
            <div className="col-12 md:col-4">
                <div className="card">
                    <div className="flex justify-content-between">
                        <div>
                            <Button label="New" icon="pi pi-plus" className=" mr-2" />
                        </div>

                        <div>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Keyword Search" />
                            </span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <ListBox
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <div className="flex justify-content-between">
                        <h5>Module Access</h5>
                    </div>
                    <DataTable value={products} stripedRows>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                    </DataTable>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <div className="flex justify-content-between">
                        <h5>Module Permission</h5>
                    </div>
                    <DataTable value={products} stripedRows>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default RolesPermissions
