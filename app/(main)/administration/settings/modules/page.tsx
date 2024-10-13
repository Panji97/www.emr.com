'use client'
import { MenusService } from '@/services/master/menus'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'

interface Product {
    id?: string
    code?: string
    name?: string
    description?: string
    image?: string
    price?: number
    category?: string
    quantity?: number
    inventoryStatus?: string
    rating?: number
}

const Modules = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        MenusService.getParent().then((data) => setProducts(data.data))
    }, [])
    return (
        <div className="card">
            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card">
                        <DataTable
                            value={products}
                            selectionMode="single"
                            selection={selectedProduct!}
                            onSelectionChange={(e) => setSelectedProduct(e.value)}
                            dataKey="id"
                            tableStyle={{ minWidth: '50rem' }}
                        >
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modules
