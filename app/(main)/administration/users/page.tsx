'use client'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { UserService } from '@/services/master/users'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

const Users = () => {
    const [roles] = useState<string[]>(['SUPERADMIN', 'USER'])

    const { user } = UserService()

    const roleEditor = (options: ColumnEditorOptions) => {
        console.log(options.value)
        return (
            <Dropdown
                value={options.value}
                options={roles}
                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
            />
        )
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataTable header="User List" value={user} editMode="row" dataKey="id">
                        <Column field="id" header="Id" />
                        <Column field="email" header="Email" />
                        <Column field="username" header="Username" />
                        <Column field="verify" header="Verified" />
                        <Column
                            field="user_has_role.role.name"
                            header="Role"
                            editor={(options) => roleEditor(options)}
                        />
                        <Column
                            rowEditor={true}
                            headerStyle={{ width: '10%', minWidth: '8rem' }}
                            bodyStyle={{ textAlign: 'center' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Users
