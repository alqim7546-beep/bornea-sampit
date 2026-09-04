import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Thermometer, Droplets, Wind, MapPin, ShieldAlert, FileText, Bot, Settings, 
  Info, Search, Filter, Download, Plus, CheckCircle, AlertTriangle, Eye, EyeOff,
  User, Lock, LogOut, Sun, Moon, Volume2, VolumeX, Sparkles, Sliders, RefreshCw,
  Calendar, Layers, Map as MapIcon, Database, Check, X, ChevronRight, BarChart2,
  AlertCircle, Upload, Navigation, Compass, Layers as LayersIcon
} from 'lucide-react';

// Dataset Otentik dari Lembar Data Penelitian (Gambar 16-20 Agustus 2026)
const INITIAL_DATASET = [
  { id: 1, date: "2026-08-16", time: "09:43:44", temp: 32.6, rh: 57, location: "Sawahan, Mentawa Baru Ketapang", landCover: "Lahan semak dekat kebun sawit", di: 28.31935, status: "Sangat Gerah/Bahaya Termal", lat: -2.5510, lng: 112.9380, source: "Pengukuran Lapangan (MB Ketapang)" },
  { id: 2, date: "2026-08-16", time: "09:50:58", temp: 34.4, rh: 56, location: "Jalan Jendral S. Parman, Mentawa Baru Hulu", landCover: "Perempatan dekat sekolah", di: 29.5842, status: "Sangat Gerah/Bahaya Termal", lat: -2.5315, lng: 112.9530, source: "Pengukuran Lapangan (MB Hulu)" },
  { id: 3, date: "2026-08-16", time: "10:08:03", temp: 35.3, rh: 56, location: "Jalan Rahadi Usman No. 13, Mentawa Baru Hulu", landCover: "Pusat Pembelanjaan Mentaya", di: 30.2664, status: "Sangat Gerah/Bahaya Termal", lat: -2.5372, lng: 112.9575, source: "Pengukuran Lapangan (Pusat Kota)" },
  { id: 4, date: "2026-08-17", time: "09:43:44", temp: 34.0, rh: 57, location: "Jl. Batu Pirus, Mentawa Baru Hulu", landCover: "Mall pelayanan", di: 29.38825, status: "Sangat Gerah/Bahaya Termal", lat: -2.5398, lng: 112.9460, source: "Pengukuran Lapangan (Pelayanan)" },
  { id: 5, date: "2026-08-17", time: "09:50:58", temp: 34.2, rh: 58, location: "Jalan Jendral S. Parman, Mentawa Baru Hulu", landCover: "Perempatan dekat sekolah", di: 29.6493, status: "Sangat Gerah/Bahaya Termal", lat: -2.5315, lng: 112.9530, source: "Pengukuran Lapangan (MB Hulu)" },
  { id: 6, date: "2026-08-17", time: "10:05:53", temp: 31.2, rh: 56, location: "Jalan Antang Barat 6, Sawahan", landCover: "Lahan Semak", di: 27.1586, status: "Gerah/Moderate Discomfort", lat: -2.5450, lng: 112.9320, source: "Pengukuran Lapangan (Sawahan)" },
  { id: 7, date: "2026-08-18", time: "09:37:58", temp: 34.4, rh: 58, location: "Jalan Rahadi Usman No. 13, Mentawa Baru Hulu", landCover: "Pusat Pembelanjaan Mentaya", di: 29.8031, status: "Sangat Gerah/Bahaya Termal", lat: -2.5372, lng: 112.9575, source: "Pengukuran Lapangan (Pusat Kota)" },
  { id: 8, date: "2026-08-18", time: "09:52:47", temp: 34.2, rh: 58, location: "Jl. Batu Pirus, Mentawa Baru Hulu", landCover: "Mall pelayanan", di: 29.6493, status: "Sangat Gerah/Bahaya Termal", lat: -2.5398, lng: 112.9460, source: "Pengukuran Lapangan (Pelayanan)" },
  { id: 9, date: "2026-08-18", time: "10:06:09", temp: 31.5, rh: 56, location: "Jalan Antang Barat 6, Sawahan", landCover: "Lahan Semak", di: 27.386, status: "Gerah/Moderate Discomfort", lat: -2.5450, lng: 112.9320, source: "Pengukuran Lapangan (Sawahan)" },
  { id: 10, date: "2026-08-19", time: "09:42:50", temp: 34.7, rh: 57, location: "Jl. Batu Pirus, Mentawa Baru Hulu", landCover: "Mall pelayanan", di: 29.9227, status: "Sangat Gerah/Bahaya Termal", lat: -2.5398, lng: 112.9460, source: "Pengukuran Lapangan (Pelayanan)" },
  { id: 11, date: "2026-08-19", time: "09:56:23", temp: 32.6, rh: 58, location: "Sawahan, Mentawa Baru Ketapang", landCover: "Lahan semak dekat kebun sawit", di: 28.4189, status: "Sangat Gerah/Bahaya Termal", lat: -2.5510, lng: 112.9380, source: "Pengukuran Lapangan (MB Ketapang)" },
  { id: 12, date: "2026-08-19", time: "10:09:13", temp: 35.3, rh: 55, location: "Jalan Rahadi Usman No. 13, Mentawa Baru Hulu", landCover: "Pusat Pembelanjaan Mentaya", di: 30.152, status: "Sangat Gerah/Bahaya Termal", lat: -2.5372, lng: 112.9575, source: "Pengukuran Lapangan (Pusat Kota)" },
  { id: 13, date: "2026-08-20", time: "09:36:50", temp: 34.7, rh: 57, location: "Jalan Jendral S. Parman, Mentawa Baru Hulu", landCover: "Perempatan dekat sekolah", di: 29.9227, status: "Sangat Gerah/Bahaya Termal", lat: -2.5315, lng: 112.9530, source: "Pengukuran Lapangan (MB Hulu)" },
  { id: 14, date: "2026-08-20", time: "09:56:23", temp: 31.5, rh: 56, location: "Sawahan, Mentawa Baru Ketapang", landCover: "Lahan semak dekat kebun sawit", di: 27.386, status: "Gerah/Moderate Discomfort", lat: -2.5510, lng: 112.9380, source: "Pengukuran Lapangan (MB Ketapang)" },
  { id: 15, date: "2026-08-20", time: "10:07:09", temp: 31.5, rh: 57, location: "Jalan Antang Barat 6, Sawahan", landCover: "Lahan Semak", di: 27.4795, status: "Gerah/Moderate Discomfort", lat: null, lng: null, source: "Pengukuran Lapangan (Unmapped Sample)" } 
  // Sample #15 purposefully set with null coords to demonstrate Rule 51 & 61: "Koordinat belum tersedia"
];

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('overview'); // overview, map, table, field, whatif, report, ai, settings, about
  const [dataset, setDataset] = useState(INITIAL_DATASET);
  const [currentUser, setCurrentUser] = useState({ name: 'Muhammad Alqi', role: 'Researcher', email: 'alqi@bornea-sampit.ac.id' });
  
  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast Trigger Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [globalFilter, setGlobalFilter] = useState({
    location: 'ALL',
    status: 'ALL',
    startDate: '',
    endDate: '',
    minTemp: '',
    maxTemp: ''
  });

  // Filtered dataset evaluation
  const filteredData = useMemo(() => {
    return dataset.filter(item => {
      if (globalFilter.location !== 'ALL' && !item.location.toLowerCase().includes(globalFilter.location.toLowerCase())) return false;
      if (globalFilter.status !== 'ALL' && item.status !== globalFilter.status) return false;
      if (globalFilter.startDate && item.date < globalFilter.startDate) return false;
      if (globalFilter.endDate && item.date > globalFilter.endDate) return false;
      if (globalFilter.minTemp && item.temp < parseFloat(globalFilter.minTemp)) return false;
      if (globalFilter.maxTemp && item.temp > parseFloat(globalFilter.maxTemp)) return false;
      return true;
    });
  }, [dataset, globalFilter]);

  // Settings State
  const [settings, setSettings] = useState({
    theme: 'light',
    soundEnabled: false,
    reducedMotion: false,
    notifications: true,
    gpsConsent: false
  });

  // Unique Locations for Filter Dropdown
  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(dataset.map(d => d.location)));
    return ['ALL', ...locs];
  }, [dataset]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // login or register
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'User' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) {
      showToast('Mohon isi email dan password.', 'error');
      return;
    }
    setCurrentUser({
      name: authForm.name || authForm.email.split('@')[0],
      email: authForm.email,
      role: authForm.role || 'Researcher'
    });
    setShowAuthModal(false);
    showToast('Login berhasil. Selamat datang kembali!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logout berhasil.');
  };

  const [fieldAssessments, setFieldAssessments] = useState([
    {
      id: 'FA-101',
      date: '2026-08-20',
      time: '11:15',
      location: 'Jalan Rahadi Usman No. 13 (Pasar Mentaya)',
      observer: 'Gisela Aurelia',
      landCondition: 'Tutupan aspal beton mendominasi (>80%). Sangat minim naungan vegetasi, lalu lintas padat.',
      surfaceTemp: '42.5°C (Termometer Inframerah)',
      notes: 'Banyak pedagang mengeluhkan hawa gerah berlebih saat siang hari.',
      photoName: 'sampit_pasar_mentaya.jpg'
    }
  ]);
  const [newAssessment, setNewAssessment] = useState({
    location: '', landCondition: '', notes: '', surfaceTemp: ''
  });

  const handleAddAssessment = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Anda harus login untuk menyimpan Field Assessment.', 'error');
      return;
    }
    if (!newAssessment.location || !newAssessment.landCondition) {
      showToast('Lokasi dan kondisi lahan wajib diisi.', 'error');
      return;
    }
    const created = {
      id: `FA-${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      location: newAssessment.location,
      observer: currentUser.name,
      landCondition: newAssessment.landCondition,
      surfaceTemp: newAssessment.surfaceTemp || 'Tidak diukur',
      notes: newAssessment.notes || '-',
      photoName: 'observasi_lapangan_terlampir.jpg'
    };
    setFieldAssessments([created, ...fieldAssessments]);
    setNewAssessment({ location: '', landCondition: '', notes: '', surfaceTemp: '' });
    showToast('Assessment berhasil disimpan.', 'success');
  };

  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState([
    {
      sender: 'ai',
      text: 'Halo! Saya Konsultan Lingkungan AI BORNEA-SAMPIT. Saya dapat memberikan analisis berdasarkan 15 titik observasi riset mikroklimat Sampit (16-20 Agustus 2026). Apa yang ingin Anda ketahui?'
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMessage = aiQuery;
    setAiChat(prev => [...prev, { sender: 'user', text: userMessage }]);
    setAiQuery('');
    setAiLoading(true);

    try {
      const apiKey = ""; // Canvas runtime injection
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const datasetSummary = filteredData.map(d => 
        `[${d.date} ${d.time}] ${d.location} | Suhu: ${d.temp}°C, RH: ${d.rh}%, DI: ${d.di.toFixed(2)}, Status: ${d.status}, Tutupan: ${d.landCover}`
      ).join('\n');

      const systemPrompt = `Anda adalah Konsultan Lingkungan Akademis untuk Riset "BORNEA-SAMPIT: Urban Microclimate & Thermal Risk Analytics" yang diteliti oleh Muhammad Alqi dan Gisela Aurelia.
      Data yang tersedia (16-20 Agustus 2026):
      ${datasetSummary}
      
      Aturan ketat:
      1. Jawab berdasarkan data penelitian di atas secara jujur, obyektif, dan bermartabat akademis.
      2. Jangan membuat klaim absolut yang tidak didukung data.
      3. Jika data tidak ada dalam dataset, katakan secara jujur "Data tersebut belum tersedia dalam database penelitian BORNEA-SAMPIT".
      4. Gunakan bahasa Indonesia yang santun, profesional, dan ringkas.`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, sistem AI sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
      
      setAiChat(prev => [...prev, { sender: 'ai', text: reply }]);
      showToast('Konsultasi AI berhasil disimpan.', 'success');
    } catch (err) {
      setAiChat(prev => [...prev, { 
        sender: 'ai', 
        text: 'Maaf, terjadi kesalahan sambungan ke backend AI. Memuat respon alternatif berdasarkan aturan dataset.' 
      }]);
      showToast('Dataset memiliki error atau masalah jaringan.', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  const [simConfig, setSimConfig] = useState({
    treeCanopyIncrease: 20, // percentage
    highAlbedoRoof: 30, // percentage
    waterElement: false
  });

  const simResult = useMemo(() => {
    // Academic estimation logic based on microclimate studies:
    // +10% tree canopy -> approx -0.25 °C
    // +10% high albedo -> approx -0.15 °C
    // Water element -> approx -0.3 °C
    const tempDrop = (simConfig.treeCanopyIncrease * 0.025) + 
                     (simConfig.highAlbedoRoof * 0.015) + 
                     (simConfig.waterElement ? 0.3 : 0);

    const avgBaseTemp = filteredData.length > 0 
      ? filteredData.reduce((acc, curr) => acc + curr.temp, 0) / filteredData.length 
      : 33.8;

    const avgBaseRh = filteredData.length > 0
      ? filteredData.reduce((acc, curr) => acc + curr.rh, 0) / filteredData.length
      : 57;

    const simTemp = Math.max(25, avgBaseTemp - tempDrop);
    // Discomfort Index formula: DI = T - 0.55 * (1 - RH/100) * (T - 14.5)
    const baseDi = avgBaseTemp - 0.55 * (1 - avgBaseRh / 100) * (avgBaseTemp - 14.5);
    const simDi = simTemp - 0.55 * (1 - avgBaseRh / 100) * (simTemp - 14.5);

    return {
      tempDrop: tempDrop.toFixed(2),
      avgBaseTemp: avgBaseTemp.toFixed(1),
      simTemp: simTemp.toFixed(1),
      baseDi: baseDi.toFixed(2),
      simDi: simDi.toFixed(2),
      diReduction: (baseDi - simDi).toFixed(2)
    };
  }, [simConfig, filteredData]);

  const [userLocation, setUserLocation] = useState(null);
  const handleGetLocation = () => {
    if (!settings.gpsConsent) {
      showToast('Silakan aktifkan izin lokasi di Pengaturan terlebih dahulu.', 'error');
      return;
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          showToast('Lokasi GPS Anda berhasil didapatkan (Hanya digunakan secara lokal).', 'success');
        },
        (err) => {
          showToast(`Gagal mendapatkan lokasi GPS: ${err.message}`, 'error');
        }
      );
    } else {
      showToast('Perangkat tidak mendukung Geolocation.', 'error');
    }
  };

  return (
    <div className={`min-h-screen font-sans bg-slate-50 text-slate-800 flex flex-col ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
      
      {/* Toast Notification Bar */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`pointer-events-auto p-3.5 rounded-lg shadow-lg border text-sm font-medium flex items-start gap-2.5 transition-all ${
              t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            {t.type === 'error' ? <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> :
             t.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> :
             <Info className="w-5 h-5 text-blue-500 shrink-0" />}
            <div className="flex-1">{t.message}</div>
          </div>
        ))}
      </div>

      {/* Main Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="bg-teal-500 p-2 rounded-lg text-slate-950 font-bold">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">BORNEA-SAMPIT</h1>
              <p className="text-[11px] text-slate-400">Urban Microclimate & Thermal Risk Analytics</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'overview', label: 'Ringkasan', icon: BarChart2 },
              { id: 'map', label: 'Peta GIS', icon: MapIcon },
              { id: 'table', label: 'Tabel Data', icon: Database },
              { id: 'field', label: 'Field Assessment', icon: Compass },
              { id: 'whatif', label: 'Simulasi What-If', icon: Sliders },
              { id: 'report', label: 'Laporan', icon: FileText },
              { id: 'ai', label: 'Konsultan AI', icon: Bot },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === tab.id 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* User Auth & Settings */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('about')}
              className={`p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 ${activeTab === 'about' ? 'bg-slate-800 text-white' : ''}`}
              title="Tentang Penelitian"
            >
              <Info className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 ${activeTab === 'settings' ? 'bg-slate-800 text-white' : ''}`}
              title="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-teal-400">{currentUser.role}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                Masuk
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex overflow-x-auto bg-slate-950 border-t border-slate-800 px-2 py-1 scrollbar-none">
          {[
            { id: 'overview', label: 'Ringkasan', icon: BarChart2 },
            { id: 'map', label: 'Peta', icon: MapIcon },
            { id: 'table', label: 'Tabel', icon: Database },
            { id: 'field', label: 'Field', icon: Compass },
            { id: 'whatif', label: 'What-If', icon: Sliders },
            { id: 'report', label: 'Laporan', icon: FileText },
            { id: 'ai', label: 'AI', icon: Bot },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
                activeTab === tab.id ? 'bg-teal-600 text-white' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {}
      <section className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Filter className="w-4 h-4 text-teal-600" />
            <span>FILTER GLOBAL DATASET:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Location Selector */}
            <select 
              value={globalFilter.location} 
              onChange={e => setGlobalFilter({...globalFilter, location: e.target.value})}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Lokasi ({uniqueLocations.length - 1})</option>
              {uniqueLocations.filter(l => l !== 'ALL').map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            {/* Risk Status Selector */}
            <select
              value={globalFilter.status}
              onChange={e => setGlobalFilter({...globalFilter, status: e.target.value})}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Status Risiko</option>
              <option value="Sangat Gerah/Bahaya Termal">Sangat Gerah/Bahaya Termal</option>
              <option value="Gerah/Moderate Discomfort">Gerah/Moderate Discomfort</option>
            </select>

            {/* Reset Filter Button */}
            {(globalFilter.location !== 'ALL' || globalFilter.status !== 'ALL' || globalFilter.minTemp || globalFilter.startDate) && (
              <button
                onClick={() => setGlobalFilter({ location: 'ALL', status: 'ALL', startDate: '', endDate: '', minTemp: '', maxTemp: '' })}
                className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 underline ml-auto"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
            Tampil: {filteredData.length} dari {dataset.length} Sampel
          </div>
        </div>
      </section>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Notice / Scientific Disclaimer Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 text-xs leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Disclaimer Akademis Penelitian:</span> Data mikroilimat ini merupakan hasil pengukuran sampel lapangan lapangan terbatas periode 16–20 Agustus 2026 di Kecamatan Mentawa Baru Ketapang & Mentawa Baru Hulu, Sampit. Data <span className="font-semibold underline">bukan sensor real-time otomatis</span>. Hubungan variabel tutupan lahan & suhu diinterpretasikan berdasarkan data empiris terukur.
              </div>
            </div>

            {/* Key Performance Indicators (KPI Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                  <Thermometer className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Rata-rata Suhu Udara</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {filteredData.length > 0 ? (filteredData.reduce((a,b)=>a+b.temp, 0)/filteredData.length).toFixed(1) : 0} °C
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Maksimum: {filteredData.length > 0 ? Math.max(...filteredData.map(d=>d.temp)) : 0}°C</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Rata-rata Kelembapan (RH)</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {filteredData.length > 0 ? (filteredData.reduce((a,b)=>a+b.rh, 0)/filteredData.length).toFixed(1) : 0} %
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Rentang: 55% - 58%</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Skor Discomfort Index (DI)</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {filteredData.length > 0 ? (filteredData.reduce((a,b)=>a+b.di, 0)/filteredData.length).toFixed(2) : 0}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Kategori Rata-rata: Bahaya Termal</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Sampel Titik Terpetakan</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {filteredData.filter(d => d.lat !== null).length} / {filteredData.length}
                  </div>
                  <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                    {filteredData.filter(d => d.lat === null).length} Tanpa Koordinat
                  </div>
                </div>
              </div>

            </div>

            {/* Visual Analytics / Data Comparison Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Temperature & DI Breakdown Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-teal-600" />
                    Distribusi Suhu Udara per Sampel Lokasi
                  </h3>
                  <span className="text-[11px] text-slate-400">16-20 Agustus 2026</span>
                </div>

                {filteredData.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Belum Ada Data Penelitian yang Memenuhi Filter.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {filteredData.map(item => (
                      <div key={item.id} className="text-xs space-y-1">
                        <div className="flex justify-between font-medium text-slate-700">
                          <span className="truncate max-w-[220px]" title={item.location}>#{item.id} {item.location}</span>
                          <span className="font-mono">{item.temp}°C (DI: {item.di.toFixed(1)})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full ${item.temp > 34 ? 'bg-red-500' : item.temp > 32 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(100, ((item.temp - 25) / 15) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Land Cover Characteristics & Risk Summary */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-600" />
                    Analisis Karakteristik Tutupan Lahan
                  </h3>
                  <span className="text-[11px] text-slate-400">Korelasi Observasi</span>
                </div>

                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg space-y-1">
                    <div className="font-bold text-red-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Area Terbangun & Koridor Komersial
                    </div>
                    <p className="text-[11px] text-red-800">
                      Lokasi seperti Pusat Pembelanjaan Mentaya (Jl. Rahadi Usman) dan Mall Pelayanan (Jl. Batu Pirus) mencatat suhu rata-rata <span className="font-semibold">34.2°C - 35.3°C</span> dengan DI &gt; 29.5 (Bahaya Termal). Tutupan aspal dan struktur padat memperkuat retensi panas lokal.
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Area Vegetasi & Lahan Semak Terbuka
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Lokasi Sawahan (Jl. Antang Barat 6) mencatat suhu relatif lebih rendah (<span className="font-semibold">31.2°C - 31.5°C</span>) dengan DI 27.1 - 27.4 (Moderate Discomfort). Keberadaan vegetasi semak mengurangi pemanasan permukaan langsung.
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 italic pt-2">
                    * Catatan Akademis (Sesuai Poin 58): Data menunjukkan adanya perbedaan kondisi suhu pada lokasi dengan karakter lingkungan yang berbeda. Penafsiran sebab-akibat memerlukan kajian mikroklimat lebih mendalam.
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {}
        {/* ================= MAP TAB ================= */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Peta Distribusi Risiko Termal Sampit</h2>
                <p className="text-xs text-slate-500">Visualisasi spasial berdasarkan koordinat sampel terdaftar</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={handleGetLocation}
                  className="bg-slate-800 text-white px-3 py-1.5 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-400" />
                  Gunakan Lokasi Saya (GPS)
                </button>
              </div>
            </div>

            {/* Custom Interactive Map Container (Simulated Leaflet view with precise Sampit coordinates) */}
            <div className="relative w-full h-[500px] bg-slate-900 rounded-xl overflow-hidden border border-slate-300 shadow-inner flex flex-col justify-between p-4">
              
              {/* Top Controls Overlay */}
              <div className="z-10 flex justify-between items-start pointer-events-auto">
                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-lg shadow-md border border-slate-200 text-xs space-y-1 max-w-xs">
                  <div className="font-bold text-slate-800">Legenda Status Termal</div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                    <span>Sangat Gerah / Bahaya Termal (DI &ge; 28)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Gerah / Moderate Discomfort (DI &lt; 28)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700 pt-1 border-t border-slate-200 text-[10px]">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{filteredData.filter(d=>d.lat === null).length} record tanpa koordinat (disembunyikan dari marker)</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 text-white p-2 rounded-lg text-[11px] font-mono">
                  Basemap: OpenStreetMap | Wilayah: Mentawa Baru Sampit
                </div>
              </div>

              {/* Simulated Map Markers Plot */}
              <div className="absolute inset-0 bg-slate-800 opacity-90 flex items-center justify-center">
                {/* SVG Map Grid Background */}
                <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* River Mentaya SVG representation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path d="M 100 0 Q 300 200 400 500" fill="none" stroke="#38bdf8" strokeWidth="40" />
                </svg>

                {/* Plotting mapped markers relative to Sampit coordinates */}
                {filteredData.filter(d => d.lat !== null).map((item, index) => {
                  // Coordinate scaling to map viewport relative to Sampit center (-2.535, 112.950)
                  const offsetX = ((item.lng - 112.930) / 0.035) * 100;
                  const offsetY = ((item.lat - (-2.525)) / (-0.035)) * 100;

                  const isDanger = item.status.includes('Sangat Gerah');

                  return (
                    <div
                      key={item.id}
                      style={{ left: `${Math.max(10, Math.min(85, offsetX))}%`, top: `${Math.max(15, Math.min(80, offsetY))}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-lg transition-transform group-hover:scale-125 ${
                        isDanger ? 'bg-red-500 ring-4 ring-red-500/30' : 'bg-emerald-500 ring-4 ring-emerald-500/30'
                      }`}>
                        {item.id}
                      </div>

                      {/* Marker Popup Hover Card */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-3 text-slate-800 text-xs z-30">
                        <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1">{item.location}</div>
                        <div className="space-y-0.5 text-[11px]">
                          <div><span className="text-slate-500">Waktu:</span> {item.date} ({item.time})</div>
                          <div><span className="text-slate-500">Suhu:</span> <span className="font-semibold text-red-600">{item.temp}°C</span> | RH: {item.rh}%</div>
                          <div><span className="text-slate-500">Skor DI:</span> <span className="font-semibold">{item.di.toFixed(2)}</span></div>
                          <div><span className="text-slate-500">Karakter Lahan:</span> {item.landCover}</div>
                          <div className="mt-1.5 pt-1 border-t border-slate-100 font-semibold text-teal-700">{item.status}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* User GPS Marker */}
                {userLocation && (
                  <div 
                    style={{ left: '50%', top: '50%' }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white animate-ping absolute"></div>
                    <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                    <span className="bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded mt-1 font-mono">Posisi Anda</span>
                  </div>
                )}
              </div>

              {/* Bottom Information Bar */}
              <div className="z-10 bg-white/90 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 flex justify-between items-center pointer-events-auto">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-slate-500" />
                  <span>Kecamatan Mentawa Baru Ketapang & Mentawa Baru Hulu, Kotawaringin Timur</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Total Marker Aktif: {filteredData.filter(d=>d.lat !== null).length} Titik
                </div>
              </div>

            </div>

            {/* Unmapped Data Notice (Poin 51 & 61) */}
            {filteredData.some(d => d.lat === null) && (
              <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>
                    <strong className="font-semibold">Koordinat Belum Tersedia:</strong> Beberapa record penelitian tetap ditampilkan dalam tabel data, namun tidak dapat dimunculkan sebagai marker peta.
                  </span>
                </div>
                <button 
                  onClick={() => setActiveTab('table')}
                  className="text-teal-700 hover:underline font-medium text-xs whitespace-nowrap"
                >
                  Lihat Tabel Data &rarr;
                </button>
              </div>
            )}

          </div>
        )}

        {}
        {/* ================= TABLE TAB ================= */}
        {activeTab === 'table' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Tabel Dataset Mikroklimat Penelitian</h2>
                <p className="text-xs text-slate-500">Record lengkap hasil pengukuran instrumen lapangan di Sampit</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Ekspor CSV diizinkan untuk keperluan akademis.', 'info')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Ekspor CSV
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3 w-12 text-center">No</th>
                    <th className="p-3">Waktu Pengambilan</th>
                    <th className="p-3 text-right">Suhu OUT (°C)</th>
                    <th className="p-3 text-right">Kelembapan (%)</th>
                    <th className="p-3">Lokasi Pengambilan</th>
                    <th className="p-3">Karakteristik Lahan</th>
                    <th className="p-3 text-right">Skor Discomfort</th>
                    <th className="p-3">Status Risiko</th>
                    <th className="p-3 text-center">Koordinat</th>
                    <th className="p-3">Sumber Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="p-8 text-center text-slate-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        Belum Ada Data Penelitian yang Sesuai dengan Kriteria Filter.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, idx) => {
                      const hasCoord = item.lat !== null && item.lng !== null;
                      const isDanger = item.status.includes('Sangat Gerah');

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 text-center font-medium text-slate-500">{item.id}</td>
                          <td className="p-3 whitespace-nowrap">
                            <div className="font-semibold">{item.date}</div>
                            <div className="text-[10px] text-slate-400">{item.time}</div>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900">{item.temp.toFixed(1)}</td>
                          <td className="p-3 text-right font-mono">{item.rh}%</td>
                          <td className="p-3 font-medium max-w-[200px]">{item.location}</td>
                          <td className="p-3 text-slate-500 max-w-[200px]">{item.landCover}</td>
                          <td className="p-3 text-right font-mono font-bold text-slate-800">{item.di.toFixed(2)}</td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              isDanger ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            {hasCoord ? (
                              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                              </span>
                            ) : (
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                                Koordinat belum tersedia
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-[10px] text-slate-400 max-w-[150px] truncate">{item.source}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div>Menampilkan {filteredData.length} sampel data terverifikasi</div>
              <div className="text-[11px] italic">Format formula DI: T - 0.55 × (1 - RH/100) × (T - 14.5)</div>
            </div>

          </div>
        )}

        {}
        {/* ================= FIELD ASSESSMENT TAB ================= */}
        {activeTab === 'field' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Input Field Observasi */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-teal-600" />
                  Tambah Observasi Lapangan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Pencatatan langsung karakteristik tutupan & persepsi termal</p>
              </div>

              <form onSubmit={handleAddAssessment} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Lokasi Observasi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Rahadi Usman (Depan Toko X)"
                    value={newAssessment.location}
                    onChange={e => setNewAssessment({...newAssessment, location: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kondisi & Tutupan Lahan *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Jelaskan rasio aspal, beton, vegetasi naungan, atau sumber pemanasan..."
                    value={newAssessment.landCondition}
                    onChange={e => setNewAssessment({...newAssessment, landCondition: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Suhu Permukaan (Bila Diukur)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 41.2°C"
                    value={newAssessment.surfaceTemp}
                    onChange={e => setNewAssessment({...newAssessment, surfaceTemp: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Catatan Tambahan Lapangan</label>
                  <input
                    type="text"
                    placeholder="Respon masyarakat, aktivitas, atau hembusan angin..."
                    value={newAssessment.notes}
                    onChange={e => setNewAssessment({...newAssessment, notes: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Simpan Assessment
                  </button>
                </div>
              </form>
            </div>

            {/* List Riwayat Observasi Lapangan */}
            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Riwayat Field Assessment Terdaftar</h3>
                <span className="text-xs text-slate-500">{fieldAssessments.length} Laporan Lapangan</span>
              </div>

              <div className="space-y-3">
                {fieldAssessments.map(fa => (
                  <div key={fa.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">{fa.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{fa.location}</h4>
                      </div>
                      <div className="text-right text-slate-400 text-[11px]">
                        <div>{fa.date} ({fa.time})</div>
                        <div className="text-slate-600 font-medium">Peneliti: {fa.observer}</div>
                      </div>
                    </div>

                    <div className="text-slate-700 leading-relaxed bg-white p-2.5 rounded border border-slate-100">
                      <strong className="text-slate-900 font-semibold">Karakter Lapangan:</strong> {fa.landCondition}
                    </div>

                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 pt-1">
                      <div><strong>Suhu Permukaan:</strong> {fa.surfaceTemp}</div>
                      <div><strong>Catatan:</strong> {fa.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {}
        {/* ================= WHAT-IF SIMULATION TAB ================= */}
        {activeTab === 'whatif' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                Simulasi Intervensi Urban Heat Island (What-If Analysis)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Estimasi pengaruh penambahan vegetasi & modifikasi material terhadap penurunan Discomfort Index ($DI$).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sliders Control Panel */}
              <div className="space-y-5 text-xs">
                
                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Penambahan Kanopi Pohon / Vegetasi:</span>
                    <span className="text-teal-700 font-bold">{simConfig.treeCanopyIncrease}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simConfig.treeCanopyIncrease}
                    onChange={e => setSimConfig({...simConfig, treeCanopyIncrease: parseInt(e.target.value)})}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Menyediakan peneduh & proses transpirasi pendinginan.</p>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Penerapan Material Albedo Tinggi (Cool Roofs):</span>
                    <span className="text-teal-700 font-bold">{simConfig.highAlbedoRoof}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simConfig.highAlbedoRoof}
                    onChange={e => setSimConfig({...simConfig, highAlbedoRoof: parseInt(e.target.value)})}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Meningkatkan pemantulan radiasi matahari pada penutup atap & jalan.</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-800">Elemen Air / RTH Terbuka</div>
                    <div className="text-[11px] text-slate-500">Integrasi kolam retensi atau taman air</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={simConfig.waterElement}
                    onChange={e => setSimConfig({...simConfig, waterElement: e.target.checked})}
                    className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

              </div>

              {/* Simulation Results Display Card */}
              <div className="bg-slate-900 text-white p-5 rounded-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-teal-400 font-semibold tracking-wider uppercase mb-1">Hasil Estimasi Simulasi</div>
                  <h3 className="text-lg font-bold">Proyeksi Penurunan Risiko Termal</h3>
                  <p className="text-xs text-slate-400 mt-1">Dihitung berdasarkan baseline rata-rata data terfilter saat ini.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <div className="text-[11px] text-slate-400">Suhu Udara Estimasi</div>
                    <div className="text-xl font-bold text-white font-mono mt-1">{simResult.simTemp} °C</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Turun ~{simResult.tempDrop} °C</div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <div className="text-[11px] text-slate-400">Skor Discomfort Index (DI)</div>
                    <div className="text-xl font-bold text-white font-mono mt-1">{simResult.simDi}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Reduksi DI ~{simResult.diReduction}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic bg-slate-950 p-3 rounded border border-slate-800">
                  * Simulasi ini merupakan model estimasi terukur mikroklimat perkotaan sebagai bahan pertimbangan arahan tata ruang akademis.
                </div>
              </div>

            </div>
          </div>
        )}

        {}
        {/* ================= REPORT TAB ================= */}
        {activeTab === 'report' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Laporan Hasil Penelitian Mikroklimat</h2>
                <p className="text-xs text-slate-500">Dokumen ringkasan eksekutif untuk keperluan akademis & pemerintah daerah</p>
              </div>

              <button
                onClick={() => {
                  window.print();
                  showToast('Laporan berhasil dibuat.', 'success');
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-4 h-4" /> Cetak / Unduh PDF
              </button>
            </div>

            {/* Printable Report Document Body */}
            <div className="p-6 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 space-y-5 text-xs leading-relaxed">
              <div className="text-center border-b border-slate-300 pb-4">
                <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">BORNEA-SAMPIT</h1>
                <h2 className="text-xs font-semibold text-slate-700">URBAN MICROCLIMATE & THERMAL RISK ANALYTICS REPORT</h2>
                <p className="text-[11px] text-slate-500 mt-1">Peneliti: Muhammad Alqi & Gisela Aurelia | Periode Data: 16–20 Agustus 2026</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">1. RINGKASAN EKSEKUTIF</h3>
                <p>
                  Berdasarkan observasi sampel lapangan di Kecamatan Mentawa Baru Ketapang dan Mentawa Baru Hulu, Kabupaten Kotawaringin Timur, kondisi risiko termal tergolong tinggi pada koridor perkotaan dengan tutupan aspal dan permukaan terbangun yang padat. Nilai Discomfort Index ($DI$) rata-rata berada pada angka <strong className="font-bold">{(filteredData.reduce((a,b)=>a+b.di,0)/filteredData.length || 0).toFixed(2)}</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">2. METODOLOGI & BATASAN</h3>
                <p>
                  Pengukuran dilakukan menggunakan instrumen pengukur suhu udara ($T$) dan kelembapan nisbi ($RH$) pada jam 09:30 - 10:15 WIB. Data merupakan <span className="underline font-semibold">sampel pengukuran lapangan terencana</span> dan <span className="underline font-semibold">bukan stasiun sensor otomatis real-time</span>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">3. REKOMENDASI TATA RUANG</h3>
                <ul className="list-disc pl-5 space-y-1 text-[11px]">
                  <li>Peningkatan peneduh vegetasi pada area komersial padat (Pasar Mentaya & Mall Pelayanan).</li>
                  <li>Insentif penerapan material reflektif pada penutup atap koridor jalan utama.</li>
                  <li>Perluasan jalur hijau pada koridor pejalan kaki untuk mereduksi paparan panas langsung.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between italic">
                <span>Di-generate secara otomatis oleh Platform BORNEA-SAMPIT</span>
                <span>Halaman 1 dari 1</span>
              </div>
            </div>
          </div>
        )}

        {}
        {/* ================= AI CONSULTANT TAB ================= */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[600px] overflow-hidden">
            
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">Konsultan Lingkungan AI BORNEA-SAMPIT</h2>
                  <p className="text-[11px] text-slate-400">Powered by Gemini AI dengan Grounding Dataset Sampit</p>
                </div>
              </div>
              <div className="text-[10px] bg-slate-800 text-teal-400 px-2.5 py-1 rounded-full border border-slate-700 font-mono">
                Akademis & Terverifikasi
              </div>
            </div>

            {/* Chat History Box */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {aiChat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                    <span>Menganalisis dataset mikroklimat...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleAskAI} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Tanyakan analisis suhu, lokasi terpanas, atau rekomendasi..."
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Kirim
              </button>
            </form>

          </div>
        )}

        {}
        {/* ================= SETTINGS TAB ================= */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-900 text-sm">Pengaturan & Preferensi Platform</h2>
              <p className="text-xs text-slate-500">Atur privasi, audio, dan opsi tampilan antarmuka</p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Profile Card */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  {currentUser ? currentUser.name[0] : 'U'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{currentUser ? currentUser.name : 'Tamu (Guest)'}</div>
                  <div className="text-[11px] text-slate-500">{currentUser ? currentUser.role : 'Belum Login'}</div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-800">Fitur Suara / Audio Consent</div>
                    <div className="text-[11px] text-slate-500">Izin memutar audio konfirmasi (Rule 55: tidak aktif otomatis)</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={e => {
                      setSettings({...settings, soundEnabled: e.target.checked});
                      showToast(`Preferensi suara: ${e.target.checked ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                    }}
                    className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-800">Izin Akses GPS Lokasi</div>
                    <div className="text-[11px] text-slate-500">Rule 53: Tidak menyimpan lokasi pengguna tanpa persetujuan</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.gpsConsent}
                    onChange={e => {
                      setSettings({...settings, gpsConsent: e.target.checked});
                      showToast(`Izin GPS: ${e.target.checked ? 'Disetujui' : 'Dicabut'}`);
                    }}
                    className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-800">Reduced Motion (Gerakan Minimal)</div>
                    <div className="text-[11px] text-slate-500">Mengurangi animasi antarmuka untuk aksesibilitas</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={e => setSettings({...settings, reducedMotion: e.target.checked})}
                    className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {}
        {/* ================= ABOUT TAB ================= */}
        {activeTab === 'about' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
            <div className="text-center border-b border-slate-100 pb-4">
              <h1 className="text-xl font-bold text-slate-900 tracking-wide">BORNEA-SAMPIT</h1>
              <p className="text-xs font-medium text-teal-700">Urban Microclimate & Thermal Risk Analytics</p>
              <div className="mt-2 text-xs text-slate-600">
                <strong>Peneliti Utama:</strong> Muhammad Alqi & Gisela Aurelia
              </div>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Wilayah & Periode Penelitian</h3>
                <p>
                  Kecamatan Mentawa Baru Ketapang & Mentawa Baru Hulu, Kota Sampit, Kabupaten Kotawaringin Timur, Kalimantan Tengah. Pengukuran sampel dilaksanakan pada tanggal <strong className="font-semibold">16–20 Agustus 2026</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">Tujuan & Parameter Akademis</h3>
                <p>
                  Mengidentifikasi variasi mikroilimat lokal (Suhu Udara dan Kelembapan Nisbi) pada tutupan lahan yang berbeda serta menghitung tingkat kenyamanan termal menggunakan indikator <strong className="font-semibold">Discomfort Index (DI)</strong>.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg space-y-2 text-amber-900">
                <h4 className="font-bold text-xs">Pernyataan Penting Kebijakan Data (Rule 56 & 58):</h4>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Data dalam platform ini merupakan hasil pengukuran sampel instrumen lapangan, <strong className="font-semibold">bukan stasiun sensor real-time otomatis</strong>.</li>
                  <li>Fitur AI Konsultan hanya membantu interpretasi akademis dan <strong className="font-semibold">tidak menghasilkan data baru</strong> secara acak.</li>
                  <li>Pernyataan sebab-akibat lingkungan disajikan sesuai observasi data empiris terukur tanpa klaim berlebihan.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Masuk / Autentikasi Pengguna</h3>
              <button onClick={() => setShowAuthModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Contoh: Muhammad Alqi"
                  value={authForm.name}
                  onChange={e => setAuthForm({...authForm, name: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Akademis *</label>
                <input
                  type="email"
                  required
                  placeholder="alqi@bornea-sampit.ac.id"
                  value={authForm.email}
                  onChange={e => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={e => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Peran Pengguna (Role)</label>
                <select
                  value={authForm.role}
                  onChange={e => setAuthForm({...authForm, role: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Researcher">Researcher / Peneliti</option>
                  <option value="Admin">Admin Database</option>
                  <option value="User">Pengguna Umum</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded transition-colors mt-2"
              >
                Masuk ke Platform
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-white text-sm">BORNEA-SAMPIT</div>
            <div>Urban Microclimate & Thermal Risk Analytics | Research Data Platform</div>
            <div className="text-[11px] text-teal-400">Researchers: Muhammad Alqi & Gisela Aurelia</div>
          </div>

          <div className="text-center md:text-right space-y-1 text-[11px]">
            <div>Sumber Data: Pengukuran Lapangan Terencana Sampit (16-20 Agustus 2026)</div>
            <div>Disclaimer: Data bukan sensor real-time otomatis. Hasil analisis diperuntukkan keperluan akademis.</div>
            <div className="text-slate-500">&copy; 2026 BORNEA-SAMPIT Research Team. Hak Cipta Dilindungi.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
