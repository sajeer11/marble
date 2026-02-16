import React, { useState, useEffect } from 'react';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface Review {
    id: number;
    productId: number;
    userId: number;
    orderId: number;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        name: string;
    };
}

export default function ReviewsSection({ productId, userId }: { productId: number; userId?: number }) {
    const { user: authUser } = useUserAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [orderId, setOrderId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [verifiedOrder, setVerifiedOrder] = useState<any | null>(null);

    useEffect(() => {
        fetchReviews();
        if (userId && authUser?.email) checkOrderVerification();

        // Handle auto-review from dashboard
        const params = new URLSearchParams(window.location.search);
        if (params.get('review') === 'true') {
            const urlOrderId = params.get('orderId');
            if (urlOrderId) {
                setOrderId(urlOrderId);
                // Scroll to review section after a short delay to ensure rendering
                setTimeout(() => {
                    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }, [productId, userId, authUser?.email]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?productId=${productId}`);
            if (res.ok) setReviews(await res.json());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const checkOrderVerification = async () => {
        if (!authUser?.email) return;
        try {
            const res = await fetch(`/api/checkout?email=${encodeURIComponent(authUser.email)}`);
            if (res.ok) {
                const orders = await res.json();
                const validOrder = orders.find((o: any) => {
                    const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
                    return items.some((it: any) => parseInt(it.productId) === productId);
                });
                if (validOrder) {
                    setVerifiedOrder(validOrder);
                    setOrderId(validOrder.customId || validOrder.id.toString());
                }
            }
        } catch (e) {
            console.error('Failed to verify order:', e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            setError('Please login to leave a review');
            return;
        }
        if (!orderId) {
            setError('Order ID is required to verify your purchase');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, userId, orderId, rating, comment })
            });

            if (res.ok) {
                setComment('');
                setOrderId('');
                fetchReviews();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to post review');
            }
        } catch (e) {
            setError('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div id="reviews-section" className="mt-20 border-t pt-10">
            <h3 className="text-2xl font-display font-bold mb-8">Customer Reviews</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Review List */}
                <div className="space-y-6">
                    {loading ? <p>Loading reviews...</p> : reviews.length === 0 ? <p className="text-gray-500">No reviews yet.</p> : (
                        reviews.map(r => (
                            <div key={r.id} className="border-b pb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-icons text-sm">{i < r.rating ? 'star' : 'star_border'}</span>
                                        ))}
                                    </div>
                                    <span className="font-semibold text-sm">{r.user.name || 'Anonymous'}</span>
                                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-green-100">
                                        <span className="material-icons text-[10px]">verified</span>
                                        Verified Purchase (Order #{r.orderId})
                                    </span>
                                    <span className="text-gray-400 text-xs ml-auto">{new Date(r.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{r.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Post Review */}
                <div className="bg-gray-50 dark:bg-surface-dark p-6 rounded-xl">
                    <h4 className="font-bold mb-4">Leave a Review</h4>
                    <p className="text-xs text-gray-500 mb-6">Only customers with a valid Order ID can review products.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <label className="text-sm font-semibold">Rating:</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`material-icons text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    >
                                        star
                                    </button>
                                ))}
                            </div>
                        </div>

                        {verifiedOrder ? (
                            <div className="bg-green-50 border border-green-100 p-3 rounded-lg flex items-center gap-3">
                                <span className="material-icons text-green-600 text-lg">verified</span>
                                <div>
                                    <p className="text-green-800 text-xs font-bold uppercase">Verified Purchase Found</p>
                                    <p className="text-green-600 text-[10px]">Order #{verifiedOrder.customId || verifiedOrder.id}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Order ID (e.g. 123)"
                                    value={orderId}
                                    onChange={e => setOrderId(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border dark:bg-background-dark outline-none focus:ring-1 focus:ring-primary text-sm"
                                />
                            </div>
                        )}

                        <textarea
                            placeholder="Your experience with this product..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border dark:bg-background-dark outline-none focus:ring-1 focus:ring-primary text-sm"
                        />

                        {error && <p className="text-red-500 text-xs">{error}</p>}

                        <button
                            disabled={submitting}
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg w-full transition-all flex items-center justify-center gap-2"
                        >
                            {submitting ? 'Submitting...' : 'Post Review'}
                            {!submitting && <span className="material-icons text-sm">send</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
