import React, { useState } from 'react';
import { Appointment } from '../../types';
import { useToast } from '../../context/ToastContext';
import { updateAppointmentStatusAdmin } from '../../services/api';
import { Calendar, Search } from 'lucide-react';

interface AppointmentsManagerProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  appointments,
  setAppointments,
}) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleUpdateStatus = async (aptId: string, status: string) => {
    try {
      await updateAppointmentStatusAdmin(aptId, status);
      setAppointments((prev) =>
        prev.map((a) => ((a as any)._id === aptId || a.id === aptId ? { ...a, status: status as any } : a))
      );
      addToast('success', 'Appointment Status Updated', `Status changed to ${status}`);
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const patient = apt.patientName || '';
    const phone = apt.phone || '';
    const matchesSearch = patient.toLowerCase().includes(search.toLowerCase()) || phone.includes(search);
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              placeholder="Search patient name or phone..."
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
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B16]">
            <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Patient Name & Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date & Time Slot</th>
                <th className="p-4">Health Concern / Notes</th>
                <th className="p-4">Status Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDA]">
              {filteredAppointments.map((apt) => {
                const id = (apt as any)._id || apt.id;
                return (
                  <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#1E1B16]">{apt.patientName}</p>
                      <p className="text-[11px] text-[#7A8F6C]">{apt.phone}</p>
                    </td>
                    <td className="p-4 font-serif font-bold text-[#2F4A3D]">{apt.serviceTitle}</td>
                    <td className="p-4 font-medium text-[#1E1B16]">{apt.date} at {apt.time}</td>
                    <td className="p-4 text-[11px] text-gray-500 max-w-xs">{apt.notes || 'No health notes'}</td>
                    <td className="p-4">
                      <select
                        value={apt.status}
                        onChange={(e) => handleUpdateStatus(id, e.target.value)}
                        className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
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
