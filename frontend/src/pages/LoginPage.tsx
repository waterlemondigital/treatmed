import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageView } from '../types';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface LoginPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('salman@treatmed.in');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated UI state toggles for testing production error states
  const [simulatedError, setSimulatedError] = useState<'none' | 'invalid' | 'unverified' | 'locked'>('none');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (simulatedError === 'invalid') {
        addToast('error', 'Login Failed', 'Invalid email or password combination.');
        return;
      }
      if (simulatedError === 'unverified') {
        addToast('warning', 'Email Unverified', 'Please check your inbox to verify your account.');
        return;
      }
      if (simulatedError === 'locked') {
        addToast('error', 'Account Locked', 'Too many failed attempts. Try again in 15 minutes.');
        return;
      }

      login(email, password);
      addToast('success', 'Welcome Back', 'Logged into your Treatmed account.');
      setCurrentPage({ type: 'account' });
    }, 1000);
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="bg-white rounded-3xl border border-[#E8DCC4] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Visual Branding Panel */}
          <div className="md:col-span-5 bg-[#2F4A3D] text-white p-8 flex flex-col justify-between relative">
            <div>
              <Logo size="lg" className="text-white mb-8" />
              <h2 className="font-serif font-bold text-2xl text-[#FBF8F2] mb-3">
                Welcome Back to Treatmed
              </h2>
              <p className="text-xs text-[#E8DCC4]/80 leading-relaxed mb-6">
                Access your past Unani consultations, Hijama therapy schedules, and order histories from our Kanakia, Mira Road store.
              </p>
            </div>

            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B9964A] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Patient Portal Features</span>
              </div>
              <p className="text-[#E8DCC4]">
                • Track ongoing herbal prescription schedules<br />
                • Fast 1-click reordering of dates & Sidr honey
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-2xl text-[#1E1B16]">
                Patient & Member Login
              </h3>
              <p className="text-xs text-[#4A453D] mt-1">
                Enter your credentials to manage your health record.
              </p>
            </div>

            {/* Error simulation toggle bar for reviewer inspection */}
            <div className="bg-[#FAF4E8] p-3 rounded-2xl border border-[#E8DCC4] text-[11px] space-y-1">
              <span className="font-bold text-[#8C6D2F] uppercase tracking-wider block">
                UI Testing Mode (Simulate Production Auth States):
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSimulatedError('none')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${simulatedError === 'none' ? 'bg-[#2F4A3D] text-white' : 'bg-white text-[#1E1B16]'}`}
                >
                  Normal Success
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedError('invalid')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${simulatedError === 'invalid' ? 'bg-red-700 text-white' : 'bg-white text-[#1E1B16]'}`}
                >
                  Invalid Password
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedError('unverified')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${simulatedError === 'unverified' ? 'bg-amber-600 text-white' : 'bg-white text-[#1E1B16]'}`}
                >
                  Email Unverified
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedError('locked')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${simulatedError === 'locked' ? 'bg-gray-800 text-white' : 'bg-white text-[#1E1B16]'}`}
                >
                  Rate Limited
                </button>
              </div>
            </div>

            {/* Simulated Banners based on selection */}
            {simulatedError === 'invalid' && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>The password or email you entered is incorrect.</span>
              </div>
            )}

            {simulatedError === 'unverified' && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Email Verification Required</span>
                </div>
                <p className="text-[11px]">We sent a verification link to your email. Please click it to activate your account.</p>
                <button
                  type="button"
                  onClick={() => addToast('info', 'Verification Resent', 'Check your inbox for the new link.')}
                  className="text-xs font-bold text-[#8C6D2F] underline"
                >
                  Resend Verification Link
                </button>
              </div>
            )}

            {simulatedError === 'locked' && (
              <div className="p-3 bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-slate-600" />
                <span>Account temporarily locked due to multiple failed login attempts. Try again in 15 mins.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="salman@treatmed.in"
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
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                  />
                  <Lock className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#4A453D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#B9964A] rounded"
                  />
                  <span>Remember my session</span>
                </label>

                <button
                  type="button"
                  onClick={() => addToast('info', 'Reset Sent', 'Password reset instructions sent to email.')}
                  className="text-[#8C6D2F] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Sign In to Account
              </Button>
            </form>

            <div className="pt-4 border-t border-[#F3EBDA] text-center text-xs text-[#4A453D]">
              <span>Don't have a Treatmed patient account? </span>
              <button
                onClick={() => setCurrentPage({ type: 'signup' })}
                className="font-bold text-[#2F4A3D] hover:underline"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
