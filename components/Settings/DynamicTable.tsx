'use client';

import React, { useState, useEffect } from 'react';

interface DataRow {
    id: string | number;
    [key: string]: any;
}

interface Column {
    key: string;
    label: string;
    editable?: boolean;
    type?: 'text' | 'number' | 'email' | 'select';
    options?: string[];
}

interface DynamicTableProps {
    data: DataRow[];
    columns: Column[];
    onUpdate: (id: string | number, updatedRow: DataRow) => Promise<void>;
    onDelete?: (id: string | number) => Promise<void>;
    onAdd?: (newRow: Partial<DataRow>) => Promise<void>;
}

export default function DynamicTable({ data, columns, onUpdate, onDelete, onAdd }: DynamicTableProps) {
    const [rows, setRows] = useState<DataRow[]>(data);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editedData, setEditedData] = useState<Partial<DataRow>>({});
    const [isAdding, setIsAdding] = useState(false);
    const [newRowData, setNewRowData] = useState<Partial<DataRow>>({});

    useEffect(() => {
        setRows(data);
    }, [data]);

    const handleEdit = (row: DataRow) => {
        setEditingId(row.id);
        setEditedData(row);
    };

    const handleSave = async (id: string | number) => {
        try {
            await onUpdate(id, editedData as DataRow);
            setRows(rows.map(r => r.id === id ? { ...r, ...editedData } : r));
            setEditingId(null);
            setEditedData({});
        } catch (error) {
            console.error('Failed to update:', error);
            alert('Failed to update row');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedData({});
        setIsAdding(false);
        setNewRowData({});
    };

    const handleDelete = async (id: string | number) => {
        if (!onDelete) return;
        if (!confirm('Are you sure you want to delete this row?')) return;
        try {
            await onDelete(id);
            setRows(rows.filter(r => r.id !== id));
        } catch (error) {
            console.error('Failed to delete:', error);
            alert('Failed to delete row');
        }
    };

    const handleAdd = async () => {
        if (!onAdd) return;
        try {
            await onAdd(newRowData);
            setIsAdding(false);
            setNewRowData({});
            // Refresh data would be handled by parent
        } catch (error) {
            console.error('Failed to add:', error);
            alert('Failed to add row');
        }
    };

    const renderCell = (row: DataRow, column: Column, isEditing: boolean) => {
        if (!isEditing || !column.editable) {
            return <span>{row[column.key]?.toString() || '-'}</span>;
        }

        const value = editedData[column.key] ?? row[column.key];

        if (column.type === 'select' && column.options) {
            return (
                <select
                    value={value}
                    onChange={(e) => setEditedData({ ...editedData, [column.key]: e.target.value })}
                    className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                    {column.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={column.type || 'text'}
                value={value}
                onChange={(e) => setEditedData({ ...editedData, [column.key]: e.target.value })}
                className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
        );
    };

    const renderNewRowCell = (column: Column) => {
        if (column.type === 'select' && column.options) {
            return (
                <select
                    value={newRowData[column.key] || ''}
                    onChange={(e) => setNewRowData({ ...newRowData, [column.key]: e.target.value })}
                    className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
                >
                    <option value="">Select...</option>
                    {column.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={column.type || 'text'}
                value={newRowData[column.key] || ''}
                onChange={(e) => setNewRowData({ ...newRowData, [column.key]: e.target.value })}
                placeholder={column.label}
                className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
            />
        );
    };

    return (
        <div className="space-y-4">
            {onAdd && (
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <span className="material-icons text-sm">add</span>
                    Add New
                </button>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {isAdding && (
                            <tr className="bg-blue-50 dark:bg-blue-900/20">
                                {columns.map(col => (
                                    <td key={col.key} className="px-4 py-3">
                                        {renderNewRowCell(col)}
                                    </td>
                                ))}
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        onClick={handleAdd}
                                        className="text-green-600 hover:text-green-700 font-semibold"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="text-gray-600 hover:text-gray-700 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )}
                        {rows.map(row => {
                            const isEditing = editingId === row.id;
                            return (
                                <tr key={row.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${isEditing ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                                    {columns.map(col => (
                                        <td key={col.key} className="px-4 py-3 text-sm">
                                            {renderCell(row, col, isEditing)}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-sm flex gap-2">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    onClick={() => handleSave(row.id)}
                                                    className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                                                >
                                                    <span className="material-icons text-sm">check</span>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="text-gray-600 hover:text-gray-700 font-semibold flex items-center gap-1"
                                                >
                                                    <span className="material-icons text-sm">close</span>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(row)}
                                                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                                                >
                                                    <span className="material-icons text-sm">edit</span>
                                                    Edit
                                                </button>
                                                {onDelete && (
                                                    <button
                                                        onClick={() => handleDelete(row.id)}
                                                        className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                                                    >
                                                        <span className="material-icons text-sm">delete</span>
                                                        Delete
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
