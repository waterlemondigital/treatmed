import React, { useState } from 'react';
import { MOCK_SERVICES, STORE_INFO } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';
import { X, Calendar, Clock, User, Phone, FileText, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceTitle,
}) => {
  const { user, addAppointment } = useAuth();

  const [selectedService, setSelectedService] = useState(
    preselectedServiceTitle || MOCK_SERVICES[2].title // Default Hijama
  );
  const [patientName, setPatientName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:30 AM (Morning Clinic)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !date) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addAppointment(selectedService, date, timeSlot, patientName, phone, notes);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FBF8F2] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Modal Header */}
        <div className="bg-[#2F4A3D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#B9964A] text-white rounded-2xl shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#FBF8F2]">Book Clinic Appointment</h3>
              <p className="text-xs text-[#E8DCC4]/80">
                Dr. Hkm. Zaid Abdul Aziz Clinic • Mira Road
              </p>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif font-bold text-xl text-[#1E1B16]">Appointment Request Received!</h4>
            <p className="text-xs text-[#4A453D] max-w-sm mx-auto leading-relaxed">
              We have scheduled your request for <strong className="text-[#1E1B16]">{selectedService}</strong> on <strong className="text-[#1E1B16]">{date}</strong> ({timeSlot}).
            </p>

            <div className="bg-[#F3EBDA] p-4 rounded-2xl border border-[#E8DCC4] text-xs text-left space-y-1.5 text-[#1E1B16]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span className="font-semibold">{STORE_INFO.shortAddress}</span>
              </div>
              <p className="text-[11px] text-[#4A453D] pl-6">{STORE_INFO.address}</p>
              <div className="flex items-center gap-2 pt-1 border-t border-[#E8DCC4]/60">
                <Phone className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span className="font-medium">Call/WhatsApp: {STORE_INFO.phones[0]}</span>
              </div>
            </div>

            <Button variant="primary" onClick={handleReset} fullWidth>
              Done & Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Select Service or Treatment</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] font-medium focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
              >
                {MOCK_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.title} ({srv.duration})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Patient Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammed Salman"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                  />
                  <User className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Mobile Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 9820012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                  />
                  <Phone className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                >
                  <option value="11:30 AM (Morning Clinic)">11:30 AM (Morning Session)</option>
                  <option value="1:00 PM (Afternoon)">1:00 PM (Afternoon Session)</option>
                  <option value="6:30 PM (Evening Clinic)">6:30 PM (Evening Session)</option>
                  <option value="8:30 PM (Night Clinic)">8:30 PM (Night Session)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                Health Concern / Symptoms (Optional)
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Describe joint pain, hair loss, skin issues or previous treatment history..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Appointment Booking</span>
              </Button>
            </div>

            <p className="text-[11px] text-center text-[#7A8F6C]">
              No advance payment required for booking • Pay at clinic after consultation
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
