import React, { useState } from 'react';
import { Order } from '../../types';
import { useToast } from '../../context/ToastContext';
import { updateOrderStatusAdmin } from '../../services/api';
import { ShoppingBag, Search, Filter } from 'lucide-react';

interface OrdersManagerProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ orders, setOrders }) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatusAdmin(orderId, status);
      setOrders((prev) =>
        prev.map((o) => ((o as any)._id === orderId || o.id === orderId ? { ...o, status: status as any } : o))
      );
      addToast('success', 'Order Status Updated', `Order status changed to ${status}`);
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const customer = ord.shippingAddress?.name || '';
    const phone = ord.shippingAddress?.phone || '';
    const matchesSearch = customer.toLowerCase().includes(search.toLowerCase()) || phone.includes(search);
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              placeholder="Search customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
            />
            <Search className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16] font-semibold"
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B16]">
            <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer & Shipping</th>
                <th className="p-4">Line Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDA]">
              {filteredOrders.map((ord) => {
                const id = (ord as any)._id || ord.id;
                return (
                  <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#1E1B16]">{ord.shippingAddress?.name || 'Customer'}</p>
                      <p className="text-[11px] text-[#7A8F6C]">{ord.shippingAddress?.phone}</p>
                      <p className="text-[10px] text-gray-500 max-w-xs">{ord.shippingAddress?.street}, {ord.shippingAddress?.pincode}</p>
                    </td>
                    <td className="p-4 max-w-xs">
                      {ord.items?.map((it, idx) => (
                        <div key={idx} className="text-[11px] text-[#4A453D]">
                          • {it.productName} (x{it.quantity}) - ₹{it.price}
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-bold text-[#B9964A]">₹{ord.totalAmount}</td>
                    <td className="p-4 uppercase font-semibold text-[#8C6D2F]">{ord.paymentMethod}</td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(id, e.target.value)}
                        className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
