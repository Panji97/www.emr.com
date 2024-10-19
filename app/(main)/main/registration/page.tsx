'use client'
import { Demo } from '@/types/demo'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import React, { useRef, useState } from 'react'

const Registration = () => {
    let emptyProduct: Demo.Product = {
        id: '',
        name: '',
        gender: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    }

    const [products, setProducts] = useState(null)
    const [productDialog, setProductDialog] = useState(false)
    const [product, setProduct] = useState<Demo.Product>(emptyProduct)
    const [submitted, setSubmitted] = useState(false)
    const [calendarValue, setCalendarValue] = useState<any>(null)
    const toast = useRef<Toast>(null)

    const saveProduct = () => {
        setSubmitted(true)

        if (product.name.trim()) {
            let _products = [...(products as any)]
            let _product = { ...product }
            if (product.id) {
                const index = findIndexById(product.id)

                _products[index] = _product
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                })
            } else {
                _product.id = createId()
                _product.image = 'product-placeholder.svg'
                _products.push(_product)
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                })
            }

            setProducts(_products as any)
            setProductDialog(false)
            setProduct(emptyProduct)
        }
    }

    const findIndexById = (id: string) => {
        let index = -1
        for (let i = 0; i < (products as any)?.length; i++) {
            if ((products as any)[i].id === id) {
                index = i
                break
            }
        }

        return index
    }

    const createId = () => {
        let id = ''
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return id
    }

    const openNew = () => {
        setProduct(emptyProduct)
        setSubmitted(false)
        setProductDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setProductDialog(false)
    }

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    )


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || ''
        let _product = { ...product }
        _product[`${name}`] = val

        setProduct(_product)
    }

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _product = { ...product }
        _product['category'] = e.value
        setProduct(_product)
    }

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0
        let _product = { ...product }
        _product[`${name}`] = val

        setProduct(_product)
    }


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <React.Fragment>
                        <div className="my-2">
                            <Button label="Add New Patient" icon="pi pi-plus" severity="success" className=" mr-2"
                                onClick={openNew}
                            />
                            {/* <Button
                                label="Delete"
                                icon="pi pi-trash"
                                severity="danger"
                            // onClick={confirmDeleteSelected}
                            // disabled={!selectedProducts || !(selectedProducts as any).length}
                            /> */}
                        </div>
                    </React.Fragment>

                    <DataTable
                        // value={products}
                        stripedRows
                        tableStyle={{ minWidth: '50rem' }}
                    >
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Gender"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>


                    <Dialog
                        visible={productDialog}
                        style={{ width: '450px' }}
                        header="Personal Information"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        {product.image && (
                            <img
                                src={`/demo/images/product/${product.image}`}
                                alt={product.image}
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )}
                        <div className="field">
                            <label htmlFor="name">Full Name</label>
                            <InputText
                                id="name"
                                value={product.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !product.name
                                })}
                            />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label className="mb-3">Gender</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="gender"
                                        name="gender"
                                        value="Man"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Man'}
                                    />
                                    <label htmlFor="category1">Man</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="gender"
                                        name="gender"
                                        value="Woman"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Woman'}
                                    />
                                    <label htmlFor="category2">Woman</label>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="">Dath Of Birth</label>
                            <Calendar
                                showIcon
                                showButtonBar
                                value={calendarValue}
                                onChange={(e) => setCalendarValue(e.value ?? null)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea
                                id="description"
                                value={product.description}
                                onChange={(e) => onInputChange(e, 'description')}
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category1"
                                        name="category"
                                        value="Accessories"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Accessories'}
                                    />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category2"
                                        name="category"
                                        value="Clothing"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Clothing'}
                                    />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category3"
                                        name="category"
                                        value="Electronics"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Electronics'}
                                    />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category4"
                                        name="category"
                                        value="Fitness"
                                        onChange={onCategoryChange}
                                        checked={product.category === 'Fitness'}
                                    />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber
                                    id="price"
                                    value={product.price}
                                    onValueChange={(e) => onInputNumberChange(e, 'price')}
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber
                                    id="quantity"
                                    value={product.quantity}
                                    onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                                />
                            </div>
                        </div>
                    </Dialog>

                    {/* <Dialog
                        visible={deleteProductDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteProductDialogFooter}
                        onHide={hideDeleteProductDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog> */}

                </div>
            </div>
        </div>


    )
}

export default Registration
