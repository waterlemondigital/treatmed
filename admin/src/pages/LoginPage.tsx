import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@treatmed.in');
  const [password, setPassword] = useState('Admin@123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl border border-[#E8DCC4] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Visual Branding Panel */}
          <div className="md:col-span-5 bg-[#2F4A3D] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <Logo size="lg" className="text-white mb-8" />
              <h2 className="font-serif font-bold text-2xl text-[#FBF8F2] mb-3">
                Treatmed Admin Console
              </h2>
              <p className="text-xs text-[#E8DCC4]/80 leading-relaxed mb-6">
                Restricted portal for Dr. HKM. Zaid Abdul Aziz & clinic administrators to manage catalog items, patient appointments, and store orders.
              </p>
            </div>

            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B9964A] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Live Management Portal</span>
              </div>
              <p className="text-[#E8DCC4] text-[11px]">
                • Real-time MongoDB product CRUD<br />
                • Clinic booking & order status switches
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FAF4E8] text-[#8C6D2F] px-3 py-1 rounded-full text-[11px] font-bold border border-[#B9964A]/30 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#B9964A]" />
                <span>Secure Authentication</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1E1B16]">
                Sign In to Console
              </h3>
              <p className="text-xs text-[#4A453D] mt-1">
                Enter your administrative credentials to manage the platform.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                  Admin Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@treatmed.in"
                    className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                  />
                  <Mail className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                  />
                  <Lock className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2F4A3D] hover:bg-[#1E3229] text-white text-xs font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#E8DCC4] text-[11px] text-[#7A8F6C] space-y-1">
              <p className="font-bold text-[#1E1B16]">Default Demo Credentials:</p>
              <p>• Email: <strong className="text-[#1E1B16]">admin@treatmed.in</strong></p>
              <p>• Password: <strong className="text-[#1E1B16]">Admin@123</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
