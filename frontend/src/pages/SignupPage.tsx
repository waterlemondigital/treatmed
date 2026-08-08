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
  Phone, 
  User, 
  CheckCircle2, 
  X, 
  MailCheck, 
  ArrowRight 
} from 'lucide-react';

interface SignupPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ setCurrentPage }) => {
  const { signup } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  // Password strength logic
  const hasMinLen = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const strengthScore = [hasMinLen, hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: 'Empty', color: 'bg-gray-200' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (strengthScore === 3) return { label: 'Fair', color: 'bg-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-600' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      addToast('warning', 'Terms Agreement Required', 'Please accept the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerificationSent(true);
      addToast('success', 'Verification Link Dispatched', 'Check your inbox to verify your email address.');
    }, 1000);
  };

  const handleSimulatedVerifyClick = () => {
    signup(name, email, phone, password);
    addToast('success', 'Email Verified Successfully!', 'Welcome to Treatmed. Your account is now active.');
    setCurrentPage({ type: 'account' });
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="bg-white rounded-3xl border border-[#E8DCC4] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Branding Panel */}
          <div className="md:col-span-5 bg-[#2F4A3D] text-white p-8 flex flex-col justify-between relative">
            <div>
              <Logo size="lg" className="text-white mb-8" />
              <h2 className="font-serif font-bold text-2xl text-[#FBF8F2] mb-3">
                Join the Treatmed Wellness Community
              </h2>
              <p className="text-xs text-[#E8DCC4]/80 leading-relaxed">
                Create an account to book Hijama cupping therapy, consult Dr. Hkm. Zaid Abdul Aziz, and order pure Unani herbal remedies directly.
              </p>
            </div>

            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 text-xs space-y-1">
              <p className="font-bold text-[#B9964A]">Physical Store & Clinic:</p>
              <p className="text-[#E8DCC4]">Jangid Enclave, Kanakia, Mira Road – 401105</p>
            </div>
          </div>

          {/* Right Form or Verification Panel */}
          <div className="md:col-span-7 p-6 sm:p-10">
            {isVerificationSent ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-[#FAF4E8] text-[#B9964A] rounded-full flex items-center justify-center mx-auto border border-[#E8DCC4]">
                  <MailCheck className="w-8 h-8" />
                </div>

                <h3 className="font-serif font-bold text-2xl text-[#1E1B16]">
                  Verify Your Email Address
                </h3>

                <p className="text-xs text-[#4A453D] leading-relaxed max-w-sm mx-auto">
                  We sent a confirmation link to <strong className="text-[#1E1B16]">{email}</strong>. Please click the link inside your email to complete registration.
                </p>

                <div className="p-4 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] text-xs text-left space-y-2">
                  <p className="font-bold text-[#8C6D2F] uppercase tracking-wider text-[10px]">
                    Tester / Evaluation Action:
                  </p>
                  <p className="text-[#4A453D]">
                    Simulate clicking the verification link received in email:
                  </p>
                  <Button
                    variant="primary"
                    fullWidth
                    size="sm"
                    onClick={handleSimulatedVerifyClick}
                    className="gap-2 mt-2"
                  >
                    <span>Simulate Verification Link Click</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#1E1B16]">
                    Create Patient Account
                  </h3>
                  <p className="text-xs text-[#4A453D] mt-1">
                    Fill in your details for secure health & order tracking.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Salman Khan"
                        className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                      />
                      <User className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          placeholder="salman@example.com"
                          className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                        />
                        <Mail className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9820012345"
                          className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                        />
                        <Phone className="w-4 h-4 text-[#B9964A] absolute left-3 top-3" />
                      </div>
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

                    {/* Real-time Strength Meter */}
                    {password.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#7A8F6C] font-semibold">Password Strength:</span>
                          <span className="font-bold text-[#1E1B16]">{getStrengthLabel().label}</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                          <div
                            className={`h-full transition-all duration-300 ${getStrengthLabel().color}`}
                            style={{ width: `${(strengthScore / 4) * 100}%` }}
                          />
                        </div>

                        {/* Checklist */}
                        <div className="grid grid-cols-2 gap-1 text-[10px] pt-1">
                          <div className={`flex items-center gap-1 ${hasMinLen ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}>
                            {hasMinLen ? <CheckCircle2 className="w-3 h-3 text-emerald-800" /> : <X className="w-3 h-3" />}
                            <span>8+ characters</span>
                          </div>
                          <div className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}>
                            {hasNumber ? <CheckCircle2 className="w-3 h-3 text-emerald-800" /> : <X className="w-3 h-3" />}
                            <span>At least 1 number</span>
                          </div>
                          <div className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}>
                            {hasSpecial ? <CheckCircle2 className="w-3 h-3 text-emerald-800" /> : <X className="w-3 h-3" />}
                            <span>Special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="accent-[#B9964A] rounded mt-0.5"
                    />
                    <label htmlFor="terms" className="text-xs text-[#4A453D] leading-tight">
                      I agree to Treatmed's <span className="text-[#8C6D2F] font-bold underline">Terms of Service</span> and <span className="text-[#8C6D2F] font-bold underline">Privacy Policy</span>.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                  >
                    Register Account
                  </Button>
                </form>

                <div className="pt-4 border-t border-[#F3EBDA] text-center text-xs text-[#4A453D]">
                  <span>Already have an account? </span>
                  <button
                    onClick={() => setCurrentPage({ type: 'login' })}
                    className="font-bold text-[#2F4A3D] hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
