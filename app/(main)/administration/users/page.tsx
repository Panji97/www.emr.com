'use client'
import React from 'react'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { UserService } from '@/services/master/users'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'

const Users = () => {
    const { user, toast, roles, setSelectRoles, onRowEditComplete } = UserService()

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <DataTable
                        header="User List"
                        value={user}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="id" header="Id" />
                        <Column field="email" header="Email" />
                        <Column field="username" header="Username" />
                        <Column field="verify" header="Verified" />
                        <Column
                            field="user_has_role.role.name"
                            header="Role"
                            editor={(options: ColumnEditorOptions) => {
                                return (
                                    <Dropdown
                                        value={options.value}
                                        options={roles.map((e: any) => e.name)}
                                        onChange={(e: DropdownChangeEvent) => {
                                            setSelectRoles(e.value)
                                            options.editorCallback!(e.value)
                                        }}
                                    />
                                )
                            }}
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
