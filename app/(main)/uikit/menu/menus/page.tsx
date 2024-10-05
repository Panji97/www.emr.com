'use client'

import React, { useEffect, useState } from 'react'
import Menu from '../page'
import { MenusService } from '@/services/master/menus'
import { Tree, TreeCheckboxSelectionKeys, TreeMultipleSelectionKeys } from 'primereact/tree'
import { TreeNode } from 'primereact/treenode'
import { Button } from 'primereact/button'
import { UserService } from '@/services/master/users'
import { Dropdown } from 'primereact/dropdown'

function Menus() {
    const [users, setUsers] = useState([]) // Array of users
    const [selectedUser, setSelectedUser] = useState(null) // Stores the selected user
    const [menu, setMenus] = useState<TreeNode[]>([])
    const [selectedFileKeys, setSelectedFileKeys] = useState<
        TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null
    >(null)

    useEffect(() => {
        UserService.getAllUser().then((data: any) => {
            const dataUser = data.data.map((e: any) => ({
                label: e.email, // Label for the dropdown
                value: e.email // Value to store when selected
            }))
            setUsers(dataUser)
        })

        MenusService.getAll().then((data) => setMenus(data.data))
    }, [])

    const handleSelectionChange = (e: any) => {
        const value = e.value
        if (typeof value === 'object' || value === null) {
            setSelectedFileKeys(value) // Only set if value is valid type
        }
    }

    return (
        <Menu>
            <div className="mt-2">
                <div className="col-12">
                    <h5>Find User</h5>
                    <Dropdown
                        value={selectedUser} // Bind to selectedUser state
                        onChange={(e) => setSelectedUser(e.value)} // Set state when user is selected
                        options={users} // Use users as options
                        placeholder="Select a User" // Placeholder for dropdown
                        editable
                        filter
                        showClear
                    />
                </div>

                <div className="col-12">
                    <h5>User Access Permission</h5>
                    <Tree
                        value={menu}
                        selectionMode="checkbox"
                        selectionKeys={selectedFileKeys}
                        onSelectionChange={handleSelectionChange} // Use handleSelectionChange
                    />
                </div>

                <div className="flex flex-wrap">
                    <Button label="New" severity="success" raised onClick={(e) => e} />
                </div>
            </div>
        </Menu>
    )
}

export default Menus
