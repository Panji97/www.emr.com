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
    const [main, setMain] = useState<Main[]>([])
    const [child, setChild] = useState<Child[]>([])
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null)
    const [selectMain, setSelectMain] = useState<Main | null>(null)
    const [selectChild, setSelectChild] = useState<Child | null>(null)
    const [formData, setFormData] = useState<Record<string, string>>({})

    useEffect(() => {
        MenusService.getParent().then((data) => setParent(data.data))
        if (selectedParent?.id) MenusService.getMain(Number(selectedParent?.id)).then((data) => setMain(data.data))
        if (selectMain?.id) MenusService.getChild(Number(selectMain?.id)).then((data) => setChild(data.data))
    }, [selectedParent, selectMain])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }))
    }

    const saveData = async () => {
        await MenusService.upsertParent(formData)

        setFormData({})
    }

    return (
        <div className="card">
            <div className="grid">
                {/* Parent Menu */}
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
                                            value={formData.label || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={formData.icon || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={formData.path || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" onClick={saveData} />
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

                {/* Main Menu */}
                <div className="col-12 md:col-4">
                    <div className="card">
                        <OverlayPanel ref={opMain}>
                            <div className="flex justify-content-center">
                                <div className="card flex flex-column justify-content-center gap-2">
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="header_id">Header Id</label>
                                        <InputText
                                            id="header_id"
                                            placeholder="example 1"
                                            value={formData.header_id || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Label Name</label>
                                        <InputText
                                            id="label"
                                            placeholder="example Home"
                                            value={formData.label || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={formData.icon || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={formData.path || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="url">Url</label>
                                        <InputText
                                            placeholder="example https://github.com/"
                                            id="url"
                                            value={formData.url || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="target">Target</label>
                                        <InputText
                                            placeholder="example _blank"
                                            id="target"
                                            value={formData.target || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="badge">Badge</label>
                                        <InputText
                                            placeholder="example NEW"
                                            id="badge"
                                            value={formData.badge || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="class">Class</label>
                                        <InputText
                                            placeholder="example rotated-icon"
                                            id="class"
                                            value={formData.class || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="preventexact">Prevent exact</label>
                                        <InputText
                                            placeholder="example true"
                                            id="preventexact"
                                            value={formData.preventexact || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" onClick={saveData} />
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

                {/* Child Menu */}
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
                                            value={formData.menu_id || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        <label htmlFor="label">Label Name</label>
                                        <InputText
                                            id="label"
                                            placeholder="example Home"
                                            value={formData.label || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="icon">Icon Name</label>
                                        <InputText
                                            id="icon"
                                            placeholder="example pi pi-plus"
                                            value={formData.icon || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="path">Path To</label>
                                        <InputText
                                            placeholder="example /../.."
                                            id="path"
                                            value={formData.path || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="url">Url</label>
                                        <InputText
                                            placeholder="example https://github.com/"
                                            id="url"
                                            value={formData.url || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="target">Target</label>
                                        <InputText
                                            placeholder="example _blank"
                                            id="target"
                                            value={formData.target || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="badge">Badge</label>
                                        <InputText
                                            placeholder="example NEW"
                                            id="badge"
                                            value={formData.badge || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="class">Class</label>
                                        <InputText
                                            placeholder="example rotated-icon"
                                            id="class"
                                            value={formData.class || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="preventexact">Prevent exact</label>
                                        <InputText
                                            placeholder="example true"
                                            id="preventexact"
                                            value={formData.preventexact || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex justify-content-between gap-2 mt-2">
                                        <Button label="Cancel" icon="pi pi-times" size="small" />
                                        <Button label="Save" icon="pi pi-check" size="small" onClick={saveData} />
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
