import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { Sparkles, Search } from 'lucide-react';
import { fetchPujas } from '../../lib/api/pujas';
import FeaturedPujaCard from '../../components/layouts/puja-list/FeaturedPujaCard';
import PujaCard from '../../components/layouts/puja-list/PujaCard';
import PujaSteps from '../../components/layouts/puja-list/PujaSteps';
import PujaBookingModal from '../../components/layouts/puja-bookings/PujaBookingModal';

export default function PujaListPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = translations?.[lang]?.pujaListPage || translations?.en?.pujaListPage;

  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(null);

  useEffect(() => {
    const loadPujas = async () => {
      setLoading(true);
      try {
        const response = await fetchPujas();
        if (response && (response.success || Array.isArray(response.data || response))) {
          const list = response.data || response;
          setPujas(Array.isArray(list) ? list : [list]);
        } else {
          setErrorMsg(t.error);
        }
      } catch (err) {
        console.error("Failed to fetch pujas from backend:", err);
        setErrorMsg(t.error);
      } finally {
        setLoading(false);
      }
    };
    loadPujas();
  }, [t.error]);

  const handleOpenBooking = (puja) => {
    setSelectedPuja(puja);
    setIsModalOpen(true);
  };

  const handleSuccessBooking = (bookingData) => {

    navigate('/pujas/success', { state: { bookingData } });
  };

  const sortedPujas = [...pujas].sort((a, b) => {
    const dateA = new Date(a.event_date_time || a.eventDateTime || 0);
    const dateB = new Date(b.event_date_time || b.eventDateTime || 0);
    return dateA - dateB;
  });

  const featuredPuja = sortedPujas[0]; 
  const remainingPujas = sortedPujas.slice(1); 

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">
      
      <div className="bg-maroon-900">
        <div className="px-4 sm:px-6 pt-6 max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
            <Link to="/" className="hover:text-amber-300 transition-colors">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-cream-200 font-semibold">
              {t.breadcrumbPujas}
            </span>
          </nav>

          <Link
            to="/pujas/track"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'বুকিং স্ট্যাটাস ট্র্যাক করুন' : 'Track Booking'}</span>
          </Link>
        </div>

        <header className="text-amber-100 py-10 px-4 sm:px-6 mt-6 shadow-md text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> {t.mainBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-500 font-serif">
            {t.mainTitle}
          </h1>
          <p className="text-xs sm:text-sm font-sans text-amber-200 max-w-2xl mx-auto leading-relaxed">
            {t.mainSubtitle}
          </p>
        </header>
      </div>

      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        {loading ? (
          <div className="text-center py-20 text-stone-500 text-sm">{t.loading}</div>
        ) : errorMsg ? (
          <div className="text-center py-12 bg-white dark:bg-[#1a0408] border border-red-500/20 rounded-3xl p-6 text-red-500 text-xs">
            {errorMsg}
          </div>
        ) : pujas.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 text-stone-500 text-xs">
            {t.noPujas}
          </div>
        ) : (
          <>
            {featuredPuja && (
              <FeaturedPujaCard 
                puja={featuredPuja} 
                onBookClick={() => handleOpenBooking(featuredPuja)} 
              />
            )}

            {remainingPujas.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                {remainingPujas.map((puja, index) => (
                  <PujaCard 
                    key={puja.id || index} 
                    puja={puja} 
                    lang={lang} 
                    onBookClick={() => handleOpenBooking(puja)} 
                  />
                ))}
              </div>
            )}
          </>
        )}

        <PujaSteps lang={lang} />
      </main>

      <PujaBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        puja={selectedPuja}
        lang={lang}
        onSuccessBooking={handleSuccessBooking}
      />
    </div>
  );
}