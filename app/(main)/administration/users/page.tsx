'use client'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { UserService } from '@/services/master/users'

const Users = () => {
    const { user } = UserService()

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataTable header="User List" value={user}>
                        <Column field="id" header="Id" />
                        <Column field="email" header="Email" />
                        <Column field="username" header="Username" />
                        <Column field="verify" header="Verified" />
                        <Column />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Users
