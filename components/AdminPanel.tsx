import React, { useState } from 'react';
import { FAQItem } from '../types';
import { Plus, Edit2, Trash2, Search, Save, X, Database } from 'lucide-react';

interface AdminPanelProps {
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ faqs, setFaqs }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<FAQItem>>({});

  const handleEdit = (item: FAQItem) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      question: '',
      answer: '',
      category: 'General'
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
      setFaqs(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.question || !formData.answer) return;

    if (isAdding) {
      const newItem: FAQItem = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer,
        category: formData.category as any || 'General'
      };
      setFaqs(prev => [newItem, ...prev]);
      setIsAdding(false);
    } else if (editingId) {
      setFaqs(prev => prev.map(item => item.id === editingId ? { ...item, ...formData } as FAQItem : item));
      setEditingId(null);
    }
    setFormData({});
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto animate-fade-in bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Database className="text-blue-600" size={24} />
            Database Pertanyaan
          </h2>
          <p className="text-slate-500 text-sm mt-1">Kelola data pertanyaan dan jawaban untuk Chatbot SMK Pertiwi</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 font-medium active:scale-95"
        >
          <Plus size={18} /> Tambah Pertanyaan
        </button>
      </div>

      {/* Editor Modal/Card */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                {isAdding ? <Plus size={20} className="text-blue-600" /> : <Edit2 size={20} className="text-orange-500" />}
                {isAdding ? 'Tambah Data Baru' : 'Edit Data'}
              </h3>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori Informasi</label>
                <select 
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                  value={formData.category || 'General'}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                  <option value="General">Umum & Ekskul</option>
                  <option value="Academic">Akademik & Jurusan</option>
                  <option value="Facilities">Fasilitas Sekolah</option>
                  <option value="Admission">PPDB & Beasiswa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pertanyaan</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow placeholder-slate-400"
                  value={formData.question || ''}
                  onChange={e => setFormData({...formData, question: e.target.value})}
                  placeholder="Contoh: Apa saja syarat pendaftaran?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Jawaban Bot</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow h-32 resize-none placeholder-slate-400"
                  value={formData.answer || ''}
                  onChange={e => setFormData({...formData, answer: e.target.value})}
                  placeholder="Tuliskan jawaban lengkap yang akan diberikan bot..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-xl font-medium transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                disabled={!formData.question || !formData.answer}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
              >
                <Save size={18} /> Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text"
          placeholder="Cari pertanyaan atau jawaban..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-shadow"
        />
      </div>

      {/* Data Table / Cards */}
      <div className="grid gap-4">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                   <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold
                     ${faq.category === 'Academic' ? 'bg-purple-100 text-purple-700' :
                       faq.category === 'Admission' ? 'bg-green-100 text-green-700' :
                       faq.category === 'Facilities' ? 'bg-orange-100 text-orange-700' :
                       'bg-blue-100 text-blue-700'}
                   `}>
                     {faq.category}
                   </span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {faq.answer}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleEdit(faq)}
                  className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  title="Edit Pertanyaan"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  title="Hapus Pertanyaan"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-slate-900 font-medium">Tidak ada data ditemukan</h3>
            <p className="text-slate-500 text-sm mt-1">Coba kata kunci lain atau tambahkan pertanyaan baru.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;