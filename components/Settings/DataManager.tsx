'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from './DynamicTable';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function DataManager() {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // For now, using mock data. In production, fetch from API
        setUserData([
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'USER', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'USER', status: 'Active' },
            { id: 3, name: 'Admin User', email: 'admin@marblelux.com', role: 'ADMIN', status: 'Active' },
        ]);
        setLoading(false);
    };

    const handleUpdate = async (id: string | number, updatedRow: any) => {
        // In production, call API to update
        console.log('Update:', id, updatedRow);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserData(userData.map(u => u.id === id ? { ...u, ...updatedRow } : u));
    };

    const handleDelete = async (id: string | number) => {
        // In production, call API to delete
        console.log('Delete:', id);
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserData(userData.filter(u => u.id !== id));
    };

    const handleAdd = async (newRow: any) => {
        // In production, call API to add
        console.log('Add:', newRow);
        await new Promise(resolve => setTimeout(resolve, 500));
        const newId = Math.max(...userData.map(u => u.id)) + 1;
        setUserData([...userData, { ...newRow, id: newId }]);
    };

    const columns = [
        { key: 'id', label: 'ID', editable: false },
        { key: 'name', label: 'Name', editable: true, type: 'text' as const },
        { key: 'email', label: 'Email', editable: true, type: 'email' as const },
        { key: 'role', label: 'Role', editable: true, type: 'select' as const, options: ['USER', 'ADMIN'] },
        { key: 'status', label: 'Status', editable: true, type: 'select' as const, options: ['Active', 'Inactive'] },
    ];

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Manager</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage all system data with inline editing capabilities
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Management</h3>
                <DynamicTable
                    data={userData}
                    columns={columns}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <span className="material-icons text-sm">info</span>
                    Click "Edit" to modify a row, "Delete" to remove it, or "Add New" to create a new entry.
                </p>
            </div>
        </div>
    );
}
