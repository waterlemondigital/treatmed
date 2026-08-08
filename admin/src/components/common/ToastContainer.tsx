import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, ShieldAlert, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = 'bg-[#2F4A3D] text-white border-[#B9964A]';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          bgClass = 'bg-red-950 text-white border-red-500';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-amber-950 text-white border-amber-500';
          Icon = ShieldAlert;
        } else if (toast.type === 'info') {
          bgClass = 'bg-[#1C382B] text-white border-[#B9964A]';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 animate-in slide-in-from-right duration-300 ${bgClass}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5 text-[#B9964A]" />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-xs">{toast.title}</h4>
              {toast.message && <p className="text-[11px] opacity-90 leading-tight mt-0.5">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
