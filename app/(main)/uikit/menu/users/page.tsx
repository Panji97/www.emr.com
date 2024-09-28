'use client'

import React, { useEffect, useState } from 'react'
import Menu from '../page'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { UserService } from '@/services/master/users'
import { classNames } from 'primereact/utils'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'

function Users() {
    const [user, setUser] = useState<any[]>([])
    const [pagination, setPagination] = useState({
        total: 0,
        totalpage: 0,
        currentpage: 1,
        limit: 10
    })

    const loadUsers = (page: number, limit: number) => {
        UserService.getAllUser(page, limit).then((data) => {
            setUser(data.data)
            setPagination({
                ...pagination,
                total: data.pagination.total,
                totalpage: data.pagination.totalpage,
                currentpage: data.pagination.currentpage,
                limit: data.pagination.limit
            })
        })
    }

    useEffect(() => {
        loadUsers(pagination.currentpage, pagination.limit)
    }, [pagination.currentpage, pagination.limit])

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        const newPage = event.page + 1
        setPagination((prev) => ({
            ...prev,
            currentpage: newPage
        }))
    }

    const fieldUsername = (rowData: any) => {
        return <>{rowData.username ?? '-'}</>
    }
    const fieldRememberme = (rowData: any) => {
        return <>{rowData.rememberme ?? '-'}</>
    }
    const fieldIndex = (rowData: any, index: any) => {
        return <>{index.rowIndex + 1}</>
    }
    const fieldVerified = (rowData: any) => {
        return (
            <>
                <i
                    className={classNames('pi', {
                        'text-green-500 pi-check-circle': rowData.verify,
                        'text-pink-500 pi-times-circle': !rowData.verify
                    })}
                ></i>
            </>
        )
    }

    return (
        <Menu>
            <div className="mt-2">
                <div className="card">
                    <DataTable value={user} rowHover={true} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="index" body={fieldIndex} header="No" />
                        <Column field="email" header="Email" />
                        <Column field="id" header="Id" />
                        <Column field="username" header="Username" body={fieldUsername} />
                        <Column field="verify" header="Verify" body={fieldVerified} />
                        <Column field="rememberme" header="Rememberme" body={fieldRememberme} />
                        <Column header="Action" />
                    </DataTable>
                    <Paginator
                        rows={pagination.limit}
                        totalRecords={pagination.total}
                        onPageChange={onPageChange}
                        first={(pagination.currentpage - 1) * pagination.limit}
                    />
                </div>
            </div>
        </Menu>
    )
}

export default Users
