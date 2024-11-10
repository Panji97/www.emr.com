'use client'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { UserService } from '@/services/master/users'
import { Button } from 'primereact/button'

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
                        <Column field="user_has_role.role.name" header="Role" />
                        <Column
                            body={() => (
                                <>
                                    <Button
                                        icon="pi pi-pencil"
                                        rounded
                                        raised
                                        severity="warning"
                                        className="mr-2"
                                        onClick={() => {}}
                                    />
                                    <Button icon="pi pi-trash" rounded outlined severity="danger" />
                                </>
                            )}
                        />
                        <Column />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Users
