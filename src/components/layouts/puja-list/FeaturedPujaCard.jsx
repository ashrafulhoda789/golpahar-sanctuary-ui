
import { Link } from 'react-router';
import {  Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { translations } from '../../../locales/translations';

export default function FeaturedPujaCard({ puja }) {
  const { lang } = useLanguage();
  const t = translations?.[lang]?.pujaListPage || translations?.en?.pujaListPage;
  const isBn = lang === 'bn';

  if (!puja) return null;

  return (
    <div className="bg-white dark:bg-[#1a0408] border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-xl mb-12 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
   
        <div className="lg:col-span-5 p-4 sm:p-6 bg-amber-50/50 dark:bg-[#23060b]/60 flex justify-center">
          <div className="relative w-full max-w-[360px] h-[340px] sm:h-[380px] rounded-t-full overflow-hidden border-2 border-amber-500/50 bg-stone-900 shadow-lg">
            <img 
              src={puja.image || puja.cover_image || 'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800'} 
              alt={isBn ? (puja.title_bn || puja.titleEn) : (puja.title_en || puja.titleBn)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute bottom-3 left-3 bg-stone-950/80 text-amber-300 text-xs px-3 py-1 rounded-md font-medium border border-amber-500/30">
              {isBn ? (puja.event_type_bn || 'আসন্ন উৎসব') : (puja.event_type_en || 'Upcoming Event')}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-600 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> {t.featuredBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-stone-900 dark:text-amber-100 font-serif">
              {isBn ? (puja.title_bn || puja.titleEn) : (puja.title_en || puja.titleBn)}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-cream-200/70 font-medium">
              {isBn ? (puja.description_bn || puja.descriptionEn) : (puja.description_en || puja.descriptionBn)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/20 text-xs font-medium text-stone-700 dark:text-amber-200">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{puja.event_date_time || puja.eventDateTime || 'নির্ধারিত তারিখ'}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                {t.offeringPrice}
              </span>
              <span className="text-2xl font-bold font-serif text-amber-700 dark:text-amber-400">
                {puja.price || '৳ বিনামূল্যে'}
              </span>
            </div>

            <Link 
              to={`/pujas/${puja.id}`} 
              className="py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>{t.applyBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}