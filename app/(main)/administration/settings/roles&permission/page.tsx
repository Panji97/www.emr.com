'use client'

import React, { ChangeEvent } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { RolesService } from '@/services/master/roles'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { TreeTable, TreeTableSelectionEvent, TreeTableSelectionKeysType } from 'primereact/treetable'
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup'
import { TreeNode } from 'primereact/treenode'

const RolesPermissions = () => {
    const {
        toast,
        roles,
        visible,
        formData,
        permission,
        selectRoles,
        selectedNode,
        rolePermission,
        visiblePermission,
        setVisible,
        upsertRole,
        setFormData,
        setSelectRoles,
        setSelectedNode,
        destroyPermission,
        onRowEditComplete,
        setVisiblePermission
    } = RolesService()

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <div className="col-12 md:col-4">
                <div className="card">
                    <DataTable
                        rowHover
                        value={roles}
                        selectionMode="single"
                        selection={selectRoles}
                        onSelectionChange={(e: any) => setSelectRoles(e.value)}
                        dataKey="id"
                        editMode="row"
                        onRowEditComplete={onRowEditComplete}
                        scrollable
                        scrollHeight="700px"
                        header={
                            <div className="flex flex-wrap align-items-center justify-content-between">
                                <span className="text-xl text-900 font-bold">Roles</span>
                                <Button
                                    icon="pi pi-plus"
                                    rounded
                                    raised
                                    onClick={() => {
                                        setVisible(true)
                                        setFormData({
                                            id: '',
                                            name: ''
                                        })
                                        setSelectedNode(null)
                                    }}
                                />
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
                        />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 md:col-8">
                <div className="card">
                    <TreeTable
                        value={rolePermission}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15]}
                        header={
                            <div className="flex justify-content-between">
                                <span className="text-xl text-900 font-bold">Permission</span>
                                <Button
                                    severity="warning"
                                    icon="pi pi-pencil"
                                    rounded
                                    raised
                                    onClick={() => {
                                        setVisiblePermission(true)

                                        // Fungsi untuk memetakan rolePermission ke selectedNode
                                        const mapRolePermissionToSelectedNode = (
                                            rolePermission: TreeNode[]
                                        ): TreeTableSelectionKeysType => {
                                            const selectedNodes: TreeTableSelectionKeysType = {}

                                            const traverse = (node: TreeNode) => {
                                                if (node.key) {
                                                    selectedNodes[node.key] = {
                                                        checked: true,
                                                        partialChecked: false
                                                    }
                                                }

                                                if (node.children && node.children.length > 0) {
                                                    node.children.forEach(traverse)
                                                }
                                            }

                                            rolePermission.forEach(traverse) // Menggunakan rolePermission
                                            return selectedNodes
                                        }

                                        // Memetakan permission dari role terpilih ke selectedNode
                                        const newSelectedNode = mapRolePermissionToSelectedNode(rolePermission) // Menggunakan rolePermission
                                        setSelectedNode(newSelectedNode)
                                    }}
                                    disabled={selectRoles ? false : true}
                                />
                            </div>
                        }
                    >
                        <Column expander field="name" header="Name"></Column>
                        <Column field="path" header="Path"></Column>
                    </TreeTable>
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
                        tooltip="Role name"
                        id="role"
                        placeholder="input your text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div>
                        <TreeTable
                            value={permission}
                            selectionMode="checkbox"
                            selectionKeys={selectedNode}
                            onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNode(e.value)}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                        >
                            <Column expander></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="path" header="Path"></Column>
                        </TreeTable>
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Edit Roles Permission"
                visible={visiblePermission}
                maximizable
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!visiblePermission) return
                    setVisiblePermission(false)
                }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                footer={
                    <div className="flex justify-content-between">
                        <ConfirmPopup />
                        <Button
                            label="Delete"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={(event) => {
                                confirmPopup({
                                    target: event.currentTarget,
                                    message: 'Do you want to delete this record?',
                                    icon: 'pi pi-info-circle',
                                    acceptClassName: 'p-button-danger',
                                    accept() {
                                        destroyPermission()
                                        setVisiblePermission(false)
                                    }
                                })
                            }}
                            className="p-button-text"
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={() => {
                                setVisiblePermission(false)
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
                        value={formData.name || selectRoles?.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div>
                        <TreeTable
                            value={permission}
                            selectionMode="checkbox"
                            selectionKeys={selectedNode}
                            onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNode(e.value)}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                        >
                            <Column expander></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="path" header="Path"></Column>
                        </TreeTable>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default RolesPermissions
