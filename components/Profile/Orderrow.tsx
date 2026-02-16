
import React, { useMemo } from 'react';
import Link from 'next/link';
import { useState } from 'react';

interface OrderRowProps {
  order: any;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const products = useMemo(() => {
    if (Array.isArray(order?.products)) return order.products;
    try {
      const parsed = typeof order?.items === 'string' ? JSON.parse(order.items) : order?.items;
      if (Array.isArray(parsed)) {
        return parsed.map((it: any) => ({
          id: it.productId || it.id || String(Math.random()),
          name: it.name || 'Item',
          image: it.image || `https://picsum.photos/seed/${encodeURIComponent(it.name || it.productId || 'item')}/80/80`,
        }));
      }
    } catch { }
    return [];
  }, [order]);

  const orderIdDisplay = order?.customId ? `#${order.customId}` : `#${String(order?.id).replace('#', '')}`;
  const dateDisplay = order?.date || (order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '');
  const amountNumber = typeof order?.amount === 'number' ? order.amount : Number(order?.totalAmount || 0);

  return (
    <>
      <tr className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all group border border-border-soft">
        <td className="px-4 py-4 sm:px-8 sm:py-6 rounded-l-2xl font-bold text-slate-900 text-sm">
          {orderIdDisplay}
        </td>
        <td className="px-4 py-4 sm:px-8 sm:py-6">
          <div className="flex -space-x-3">
            {products.slice(0, 3).map((p: any, i: number) => (
              <div
                key={p.id}
                className="h-10 w-10 rounded-lg border-2 border-white bg-slate-100 bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url("${p.image}")` }}
                title={p.name}
              />
            ))}
            {products.length > 2 && (
              <div className="h-10 w-10 rounded-lg border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                +{products.length - 2}
              </div>
            )}
          </div>
        </td>
        <td className="px-4 py-4 sm:px-8 sm:py-6 text-sm text-slate-500 font-medium">{dateDisplay}</td>
        <td className="px-4 py-4 sm:px-8 sm:py-6 text-sm font-bold text-slate-900">${amountNumber.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td className="px-4 py-4 sm:px-8 sm:py-6 text-center">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getStatusStyles(order.status)}`}>
            {order.status}
          </span>
        </td>
        <td className="px-4 py-4 sm:px-8 sm:py-6 rounded-r-2xl text-right">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-blue hover:text-blue-800 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">{isExpanded ? 'expand_less' : 'visibility'}</span>
              {isExpanded ? 'Hide' : 'View'}
            </button>
            <Link href={`/track/${String(order.id).replace('#', '')}`} className="text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </Link>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-50/50">
          <td colSpan={6} className="px-8 py-6 border-x border-b border-slate-100 rounded-b-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product List with Review Buttons */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Order Items</h4>
                {products.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url("${p.image}")` }} />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-500">ID: {p.id}</p>
                      </div>
                    </div>
                    <Link
                      href={`/product/${p.id}?review=true&orderId=${order?.customId || order.id}`}
                      className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-yellow-200"
                    >
                      <span className="material-icons text-sm">rate_review</span>
                      Add Review
                    </Link>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Customer Details</h4>
                <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Customer Name:</span>
                    <span className="text-xs font-bold text-slate-900">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Email Address:</span>
                    <span className="text-xs font-bold text-slate-900">{order.email}</span>
                  </div>
                  {order.phone && (
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Phone:</span>
                      <span className="text-xs font-bold text-slate-900">{order.phone}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-50">
                    <p className="text-xs text-slate-500 mb-1">Shipping Address:</p>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {order.shippingAddress || 'Standard Shipping Address'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
