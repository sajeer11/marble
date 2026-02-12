'use client';
import React, { useEffect, useMemo, useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  image?: string | null;
  tag?: string | null;
  createdAt?: string;
}

interface Order {
  id: number;
  email: string;
  customerName?: string | null;
  totalAmount: number;
  status: string;
  items: string; // JSON string array
  createdAt: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsTotal, setProductsTotal] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const pRes = await fetch('/api/products?limit=100');
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData.products || []);
        setProductsTotal(pData.pagination?.total || (pData.products?.length || 0));
      }
    } catch {}
    try {
      const oRes = await fetch('/api/orders');
      if (oRes.ok) {
        const oData = await oRes.json();
        setOrders(oData || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalProducts = productsTotal;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  const statCards = [
    { icon: 'shopping_bag', label: 'Total Products', value: totalProducts, color: 'blue' },
    { icon: 'shopping_cart', label: 'Total Orders', value: totalOrders, color: 'green' },
    { icon: 'attach_money', label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'yellow' },
    { icon: 'check_circle', label: 'Delivered', value: deliveredOrders, color: 'purple' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const colors: any = {
            blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
            yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
            purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
          };
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-lg ${colors[card.color]}`}>
                  <span className="material-icons text-3xl">{card.icon}</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons">history</span>
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {orders.slice(0, 5).map((order) => {
                let itemCount = 0;
                try {
                  const parsed = JSON.parse(order.items);
                  itemCount = Array.isArray(parsed) ? parsed.length : 0;
                } catch {}
                return (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${Number(order.totalAmount || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{itemCount} items</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons">trending_up</span>
            Top Products
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {products
                .slice() // copy
                .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
                .slice(0, 6)
                .map((product) => {
                  const discount = product.originalPrice && product.originalPrice > 0
                    ? Math.round((1 - product.price / product.originalPrice) * 100)
                    : null;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${Number(product.price || 0).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        {discount !== null ? (
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            {discount}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setEditForm({
                              name: product.name,
                              category: product.category,
                              price: product.price,
                              originalPrice: product.originalPrice || undefined,
                              tag: product.tag || undefined,
                              image: product.image || undefined,
                            });
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingId(product.id)}
                          className="text-red-600 dark:text-red-400 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setEditingProduct(null)}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Product</h3>
              <button onClick={() => setEditingProduct(null)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white" placeholder="Name"
                value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white" placeholder="Category"
                value={editForm.category || ''} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} />
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white" placeholder="Price" type="number"
                value={String(editForm.price ?? '')} onChange={e => setEditForm(f => ({ ...f, price: Number(e.target.value) }))} />
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white" placeholder="Original Price" type="number"
                value={String(editForm.originalPrice ?? '')} onChange={e => setEditForm(f => ({ ...f, originalPrice: Number(e.target.value) }))} />
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white md:col-span-2" placeholder="Image URL"
                value={editForm.image || ''} onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))} />
              <input className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-white md:col-span-2" placeholder="Tag"
                value={editForm.tag || ''} onChange={e => setEditForm(f => ({ ...f, tag: e.target.value }))} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded border bg-white text-gray-700">Cancel</button>
              <button
                onClick={async () => {
                  if (!editingProduct) return;
                  const res = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editForm),
                  });
                  if (res.ok) {
                    setEditingProduct(null);
                    await loadData();
                  }
                }}
                className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDeletingId(null)}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delete Product</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded border bg-white text-gray-700">Cancel</button>
              <button
                onClick={async () => {
                  const res = await fetch(`/api/products/${deletingId}`, { method: 'DELETE' });
                  if (res.ok) {
                    setDeletingId(null);
                    await loadData();
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
