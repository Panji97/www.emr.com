import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const Registration = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataTable
                        // value={products}
                        stripedRows
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
    )
}

export default Registration
