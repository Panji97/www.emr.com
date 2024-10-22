'use client'

import React, { ChangeEvent } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { RolesService } from '@/services/master/roles'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { TreeTable } from 'primereact/treetable'

const RolesPermissions = () => {
    const {
        toast,
        roles,
        visible,
        opRoles,
        formData,
        selectRoles,
        setFormData,
        setVisible,
        upsertRole,
        setSelectRoles,
        onRowEditComplete
    } = RolesService()

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <div className="col-12 md:col-6">
                <div className="card">
                    <DataTable
                        showGridlines
                        stripedRows
                        value={roles}
                        selectionMode="single"
                        selection={selectRoles}
                        onSelectionChange={(e: any) => setSelectRoles(e.value)}
                        dataKey="id"
                        editMode="row"
                        onRowEditComplete={onRowEditComplete}
                        header={
                            <div className="flex flex-wrap align-items-center justify-content-between">
                                <span className="text-xl text-900 font-bold">Roles</span>
                                <Button icon="pi pi-plus" rounded raised onClick={() => setVisible(true)} />
                            </div>
                        }
                    >
                        <Column
                            header="Name"
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
                            style={{ width: '85%' }}
                        />
                        <Column header="Action" rowEditor={true} style={{ width: '15%' }} />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <p></p>
                </div>
            </div>

            <Dialog
                header="Add Roles Permission"
                visible={visible}
                maximizable
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visible) return
                    setVisible(false)
                }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                footer={
                    <div>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            onClick={() => setVisible(false)}
                            className="p-button-text"
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={() => {
                                setVisible(false)
                                upsertRole()
                            }}
                            autoFocus
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <label htmlFor="role">Role Name</label>
                    <InputText
                        id="role"
                        placeholder="input your text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div>
                        <TreeTable></TreeTable>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default RolesPermissions
