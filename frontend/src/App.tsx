import React, { useState, useEffect } from 'react';
import { PageView, Product } from './types';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { BookingModal } from './components/common/BookingModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AIAssistantWidget } from './components/common/AIAssistantWidget';
import { PageLoader } from './components/common/PageLoader';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AccountPage } from './pages/AccountPage';

import { MessageSquare } from 'lucide-react';
import { STORE_INFO } from './data/mockData';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>({ type: 'home' });
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [loaderMessage, setLoaderMessage] = useState("Harmonizing Botanical Wisdom...");

  // Initial App Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Handle Page Transition with smooth loader
  const handleNavigate = (newPage: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoaderMessage("Loading Apothecary Experience...");
    setIsLoadingPage(true);
    setCurrentPage(newPage);
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 450);
  };

  // Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceTitle, setBookingServiceTitle] = useState<string | undefined>(undefined);

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openBookingModal = (serviceTitle?: string) => {
    setBookingServiceTitle(serviceTitle);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingServiceTitle(undefined);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const openAIAssistant = () => {
    setIsAIAssistantOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FBF8F2] text-[#1E1B16] selection:bg-[#B9964A] selection:text-white">
      {/* Global Botanical Loading Screen */}
      <PageLoader isLoading={isLoadingPage} message={loaderMessage} />

      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        openBookingModal={openBookingModal}
        openAIAssistant={openAIAssistant}
      />

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(currentPage)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage.type === 'home' && (
              <HomePage
                setCurrentPage={handleNavigate}
                openBookingModal={openBookingModal}
                openAIAssistant={openAIAssistant}
                openQuickView={openQuickView}
              />
            )}

            {currentPage.type === 'shop' && (
              <ShopPage
                setCurrentPage={handleNavigate}
                openQuickView={openQuickView}
                initialCategory={currentPage.category}
                initialSearch={currentPage.searchQuery}
              />
            )}

            {currentPage.type === 'product-detail' && (
              <ProductDetailPage
                productId={currentPage.productId}
                setCurrentPage={handleNavigate}
                openQuickView={openQuickView}
              />
            )}

            {currentPage.type === 'services' && (
              <ServicesPage
                setCurrentPage={handleNavigate}
                openBookingModal={openBookingModal}
              />
            )}

            {currentPage.type === 'service-detail' && (
              <ServiceDetailPage
                serviceId={currentPage.serviceId}
                setCurrentPage={handleNavigate}
                openBookingModal={openBookingModal}
              />
            )}

            {currentPage.type === 'treatments' && (
              <TreatmentsPage
                setCurrentPage={handleNavigate}
                openBookingModal={openBookingModal}
              />
            )}

            {currentPage.type === 'about' && (
              <AboutPage
                setCurrentPage={handleNavigate}
                openBookingModal={openBookingModal}
              />
            )}

            {currentPage.type === 'contact' && <ContactPage />}

            {currentPage.type === 'cart' && <CartPage setCurrentPage={handleNavigate} />}

            {currentPage.type === 'login' && <LoginPage setCurrentPage={handleNavigate} />}

            {currentPage.type === 'signup' && <SignupPage setCurrentPage={handleNavigate} />}

            {currentPage.type === 'account' && <AccountPage setCurrentPage={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={handleNavigate} openBookingModal={openBookingModal} />

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Treatmed%20Store%2C%20I%20have%20an%20inquiry.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5B] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
          Chat on WhatsApp
        </span>
      </a>

      {/* Modals & Floating Tools */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        preselectedServiceTitle={bookingServiceTitle}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={closeQuickView}
        setCurrentPage={setCurrentPage}
      />

      <AIAssistantWidget
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        setCurrentPage={setCurrentPage}
      />

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
