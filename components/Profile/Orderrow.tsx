
import React, { useMemo } from 'react';
import Link from 'next/link';

interface OrderRowProps {
  order: any;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
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
    } catch {}
    return [];
  }, [order]);

  const orderIdDisplay = `#${String(order?.id).replace('#', '')}`;
  const dateDisplay = order?.date || (order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '');
  const amountNumber = typeof order?.amount === 'number' ? order.amount : Number(order?.totalAmount || 0);

  return (
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
        <Link href={`/track/${String(order.id).replace('#', '')}`} className="text-slate-300 group-hover:text-primary transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </Link>
      </td>
    </tr>
  );
};

export default OrderRow;
