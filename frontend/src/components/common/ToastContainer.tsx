import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        const bgClass = isSuccess
          ? 'bg-[#2F4A3D] text-white border-[#416353]'
          : isError
          ? 'bg-[#8B2626] text-white border-[#A83232]'
          : isWarning
          ? 'bg-[#B5652D] text-white border-[#C9753B]'
          : 'bg-[#1E1B16] text-[#FBF8F2] border-[#343029]';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${bgClass}`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#82D6A7]" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#FFA8A8]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#FFD18C]" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-[#E2D1A9]" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
              {toast.message && <p className="text-xs opacity-90 mt-1 leading-snug">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-white/70 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
