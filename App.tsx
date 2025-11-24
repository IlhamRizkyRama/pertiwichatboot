import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import AdminPanel from './components/AdminPanel';
import { INITIAL_FAQS } from './constants';
import { FAQItem, AppView } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from localStorage if available, otherwise use default data
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('smk_pertiwi_faqs');
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch (e) {
      console.error("Failed to load data from storage", e);
      return INITIAL_FAQS;
    }
  });

  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save to localStorage whenever faqs change
  useEffect(() => {
    localStorage.setItem('smk_pertiwi_faqs', JSON.stringify(faqs));
  }, [faqs]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">SMK</div>
             <h1 className="font-bold text-slate-800">SMK Pertiwi Ciasem</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* View Container */}
        <main className="flex-1 overflow-hidden relative">
          {currentView === AppView.DASHBOARD && (
            <div className="h-full overflow-y-auto bg-slate-50/50">
               <Dashboard faqs={faqs} onChangeView={setCurrentView} />
            </div>
          )}
          
          {currentView === AppView.CHAT && (
            <div className="h-full">
              <Chatbot faqs={faqs} />
            </div>
          )}
          
          {currentView === AppView.ADMIN && (
            <div className="h-full overflow-hidden">
              <AdminPanel faqs={faqs} setFaqs={setFaqs} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;