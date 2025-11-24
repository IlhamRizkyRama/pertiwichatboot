import React from 'react';
import { FAQItem } from '../types';
import { BookOpen, Users, Award, Briefcase, ExternalLink, ArrowRight, MapPin, School } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  faqs: FAQItem[];
  onChangeView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ faqs, onChangeView }) => {
  const stats = [
    { label: 'Total Pertanyaan Knowledge Base', value: faqs.length, icon: BookOpen, color: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Kompetensi Keahlian', value: '4', icon: Briefcase, color: 'bg-purple-500', text: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Mitra Industri', value: '50+', icon: Award, color: 'bg-orange-500', text: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Akses Mudah', value: '24/7', icon: Users, color: 'bg-green-500', text: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-xs font-medium mb-4 border border-blue-400/30">
            Sistem Informasi Sekolah
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Selamat Datang di Dashboard SMK Pertiwi Ciasem</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Kelola informasi sekolah dan berinteraksi dengan asisten AI pintar untuk layanan informasi siswa dan PPDB yang lebih cepat.
          </p>
          <button 
            onClick={() => onChangeView(AppView.CHAT)}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            Mulai Chatbot AI <ArrowRight size={18} />
          </button>
        </div>
        
        {/* Decoration Circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 -mb-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} ${stat.text} p-3 rounded-xl`}>
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions & School Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <School size={20} className="text-blue-600" />
              Menu Akses Cepat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => onChangeView(AppView.CHAT)}
                className="group p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-700 mb-1">Tanya AI Chatbot</h4>
                  <p className="text-sm text-slate-500">Informasi PPDB & Akademik</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <ArrowRight size={20} />
                </div>
              </button>

              <button 
                onClick={() => onChangeView(AppView.ADMIN)}
                className="group p-5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all text-left flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-purple-700 mb-1">Update Data Sekolah</h4>
                  <p className="text-sm text-slate-500">Kelola FAQ & Jawaban</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <SettingsIcon />
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Lokasi & Kontak</h3>
            <div className="flex flex-col md:flex-row gap-4 text-sm text-slate-600">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl flex-1">
                <MapPin className="text-red-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-slate-800">Alamat Sekolah</p>
                  <p>Kecamatan Ciasem, Kabupaten Subang, Jawa Barat.</p>
                  <p className="text-xs mt-1 text-slate-500">Akses mudah jalur utama Subang–Pamanukan</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl flex-1">
                <Briefcase className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-slate-800">Jam Operasional</p>
                  <p>Senin - Jumat: 07:00 - 16:00 WIB</p>
                  <p>Sabtu: Ekstrakurikuler</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Section */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Award size={20} className="text-yellow-400" />
              Keunggulan Kami
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 text-sm shrink-0">01</div>
                <div>
                  <p className="font-semibold text-sm mb-1">Kurikulum Industri</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Pembelajaran berbasis proyek (PjBL) dan Teaching Factory sesuai standar industri.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-purple-400 text-sm shrink-0">02</div>
                <div>
                  <p className="font-semibold text-sm mb-1">Fasilitas Lengkap</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Lab Komputer, Bengkel Mesin, dan infrastruktur Mikrotik yang memadai.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-green-400 text-sm shrink-0">03</div>
                <div>
                  <p className="font-semibold text-sm mb-1">Siap Kerja</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Kerjasama luas dengan industri untuk PKL dan penyaluran tenaga kerja.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              SMK Pertiwi Ciasem &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon wrapper
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Dashboard;