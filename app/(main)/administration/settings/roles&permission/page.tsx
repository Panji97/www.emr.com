'use client'

import React, { ChangeEvent } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { RolesService } from '@/services/master/roles'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'

const RolesPermissions = () => {
    const { toast, roles, opRoles, formData, selectRoles, setFormData, upsertRole, setSelectRoles, onRowEditComplete } =
        RolesService()

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <div className="col-12 md:col-4">
                <div className="card">
                    <div className="flex justify-content-between">
                        <div>
                            <Button
                                label="New"
                                icon="pi pi-plus"
                                className=" mr-2"
                                onClick={(e) => opRoles.current?.toggle(e)}
                            />
                        </div>
                    </div>

                    <DataTable
                        value={roles}
                        selectionMode="single"
                        selection={selectRoles}
                        onSelectionChange={(e: any) => setSelectRoles(e.value)}
                        dataKey="id"
                        editMode="row"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column
                            field="name"
                            editor={(options: ColumnEditorOptions) => (
                                <InputText
                                    type="text"
                                    value={options.value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        options.editorCallback!(e.target.value)
                                    }
                                />
                            )}
                        />
                        <Column rowEditor={true} />
                        <Column />
                    </DataTable>
                </div>
            </div>

            <OverlayPanel ref={opRoles}>
                <div className="flex justify-content-center">
                    <div className="card flex flex-column justify-content-center gap-2">
                        <div className="flex flex-column gap-3">
                            <label htmlFor="role">Role Name</label>
                            <InputText
                                id="role"
                                placeholder="input your text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-content-between gap-2 mt-2">
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                size="small"
                                onClick={(e) => opRoles.current?.toggle(e)}
                            />
                            <Button
                                label="Save"
                                icon="pi pi-check"
                                size="small"
                                onClick={(e) => {
                                    upsertRole()
                                    opRoles.current?.toggle(e)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </OverlayPanel>
        </div>
    )
}

export default RolesPermissions
