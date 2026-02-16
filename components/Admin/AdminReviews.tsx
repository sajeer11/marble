'use client';

import React, { useState, useEffect } from 'react';

interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    product: { name: string };
    user: { name: string; email: string };
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/admin/reviews');
            if (res.ok) setReviews(await res.json());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchReviews();
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading reviews...</div>;

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Manage Product Reviews</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            <th className="py-4 px-4">User</th>
                            <th className="py-4 px-4">Product</th>
                            <th className="py-4 px-4">Rating</th>
                            <th className="py-4 px-4">Comment</th>
                            <th className="py-4 px-4">Date</th>
                            <th className="py-4 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(r => (
                            <tr key={r.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                                <td className="py-4 px-4">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.user.name}</p>
                                    <p className="text-xs text-gray-500">{r.user.email}</p>
                                </td>
                                <td className="py-4 px-4 text-sm">{r.product.name}</td>
                                <td className="py-4 px-4">
                                    <div className="flex text-yellow-500">
                                        {[...Array(r.rating)].map((_, i) => <span key={i} className="material-icons text-xs">star</span>)}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm max-w-xs truncate">{r.comment}</td>
                                <td className="py-4 px-4 text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                    <button
                                        onClick={() => handleDelete(r.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                    >
                                        <span className="material-icons">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-gray-500">No reviews found in the system.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
