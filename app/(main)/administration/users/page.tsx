import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const Users = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataTable>
                        <Column />
                        <Column />
                        <Column />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Users
