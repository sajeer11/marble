'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
    className?: string;
}

export default function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size too large (max 5MB)');
            return;
        }

        try {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            onChange(data.url);
        } catch (err: any) {
            setError(err.message || 'Failed to upload image');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="flex flex-col gap-3">
                {value ? (
                    <div className="relative group w-full h-40 rounded-lg overflow-hidden border dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                                title="Change Image"
                            >
                                <span className="material-icons text-sm">edit</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="p-2 bg-white rounded-full text-red-600 hover:bg-gray-100 transition-colors"
                                title="Remove Image"
                            >
                                <span className="material-icons text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-yellow-600 dark:hover:border-yellow-500 transition-colors group"
                    >
                        {uploading ? (
                            <span className="animate-spin text-yellow-600">⚙️</span>
                        ) : (
                            <span className="material-icons text-gray-400 group-hover:text-yellow-600 transition-colors text-3xl">add_a_photo</span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                        </span>
                    </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {error && (
                    <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
            </div>
        </div>
    );
}
