'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MenusService } from '@/services/master/menus'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

interface Parent {
    id?: number
}

interface Main {
    id?: number
}

interface Child {
    id?: number
}

const Modules = () => {
    const opParent = useRef<OverlayPanel>(null)
    const opMain = useRef<OverlayPanel>(null)
    const opChild = useRef<OverlayPanel>(null)
    const [parent, setParent] = useState<Parent[]>([])
    const [valueParent, setValueParent] = useState('')
    const [main, setMain] = useState<Main[]>([])
    const [valueMain, setValueMain] = useState('')
    const [child, setChild] = useState<Child[]>([])
    const [valueChild, setValueChild] = useState('')
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null)
    const [selectMain, setSelectMain] = useState<Main | null>(null)
    const [selectChild, setSelectChild] = useState<Child | null>(null)

    useEffect(() => {
        MenusService.getParent().then((data) => setParent(data.data))
        if (selectedParent?.id) MenusService.getMain(Number(selectedParent?.id)).then((data) => setMain(data.data))
        if (selectMain?.id) MenusService.getChild(Number(selectMain?.id)).then((data) => setChild(data.data))
    }, [selectedParent, selectMain])

    return (
        <div className="card">
            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card">
                        <OverlayPanel ref={opParent}>
                            <div className="flex justify-content-center">
                                <div className="card flex flex-column justify-content-center gap-2">
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Label Name</label>
                                        <InputText
                                            id="label"
                                            placeholder="example Home"
                                            value={valueParent}
                                            onChange={(e) => setValueParent(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={valueParent}
                                            onChange={(e) => setValueParent(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={valueParent}
                                            onChange={(e) => setValueParent(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" />
                                    </div>
                                </div>
                            </div>
                        </OverlayPanel>

                        <DataTable
                            header={
                                <div className="flex justify-content-between align-items-center">
                                    <p>Parent Menu</p>
                                    <Button
                                        type="button"
                                        icon="pi pi-plus"
                                        onClick={(e) => opParent.current?.toggle(e)}
                                    />
                                </div>
                            }
                            value={parent}
                            selectionMode="single"
                            selection={selectedParent!}
                            onSelectionChange={(e) => setSelectedParent(e.value)}
                            dataKey="id"
                            scrollable
                            scrollHeight="300px"
                        >
                            <Column field="id" header="Id" />
                            <Column field="label" header="Label" />
                        </DataTable>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className="card">
                        <OverlayPanel ref={opMain}>
                            <div className="flex justify-content-center">
                                <div className="card flex flex-column justify-content-center gap-2">
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Header Id</label>
                                        <InputText
                                            id="header_id"
                                            placeholder="example 1"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Label Name</label>
                                        <InputText
                                            id="label"
                                            placeholder="example Home"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="url">Url</label>
                                        <InputText
                                            placeholder="example https://github.com/"
                                            id="url"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="target">Target</label>
                                        <InputText
                                            placeholder="example _blank"
                                            id="target"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="badge">Badge</label>
                                        <InputText
                                            placeholder="example NEW"
                                            id="badge"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="class">Class</label>
                                        <InputText
                                            placeholder="example rotated-icon"
                                            id="class"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="preventexact">Preventexact</label>
                                        <InputText
                                            placeholder="example true"
                                            id="preventexact"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" />
                                    </div>
                                </div>
                            </div>
                        </OverlayPanel>

                        <DataTable
                            header={
                                <div className="flex justify-content-between align-items-center">
                                    <p>Main Menu</p>
                                    <Button
                                        type="button"
                                        icon="pi pi-plus"
                                        onClick={(e) => opMain.current?.toggle(e)}
                                    />
                                </div>
                            }
                            value={main}
                            selectionMode="single"
                            scrollable
                            scrollHeight="300px"
                            selection={selectMain!}
                            onSelectionChange={(e) => setSelectMain(e.value)}
                            dataKey="id"
                        >
                            <Column field="id" header="Id" />
                            <Column field="label" header="Label" />
                        </DataTable>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className="card">
                        <OverlayPanel ref={opChild}>
                            <div className="flex justify-content-center">
                                <div className="card flex flex-column justify-content-center gap-2">
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="menu_id">Menu Id</label>
                                        <InputText
                                            id="menu_id"
                                            placeholder="example 1"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Label Name</label>
                                        <InputText
                                            id="label"
                                            placeholder="example Home"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="url">Url</label>
                                        <InputText
                                            placeholder="example https://github.com/"
                                            id="url"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="target">Target</label>
                                        <InputText
                                            placeholder="example _blank"
                                            id="target"
                                            value={valueMain}
                                            onChange={(e) => setValueMain(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" />
                                    </div>
                                </div>
                            </div>
                        </OverlayPanel>

                        <DataTable
                            header={
                                <div className="flex justify-content-between align-items-center">
                                    <p>Child Menu</p>
                                    <Button
                                        type="button"
                                        icon="pi pi-plus"
                                        onClick={(e) => opChild.current?.toggle(e)}
                                    />
                                </div>
                            }
                            value={child}
                            selectionMode="single"
                            selection={selectChild!}
                            onSelectionChange={(e) => setSelectChild(e.value)}
                            dataKey="id"
                            scrollable
                            scrollHeight="300px"
                        >
                            <Column field="id" header="Id" />
                            <Column field="label" header="Label" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modules
