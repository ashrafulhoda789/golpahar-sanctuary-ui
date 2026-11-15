
import { Link } from 'react-router';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export default function PujaCard({ puja, lang }) {
  const isBn = lang === 'bn';
  
  const formatPrice = (priceStr) => {
    if (!priceStr) return 'Free';

    return priceStr.replace(/[\u09E6-\u09EF]/g, d => "0123456789"[d.charCodeAt(0) - 2534]);
  };

  return (
    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>

        <div className="p-3 bg-amber-50/50 dark:bg-[#23060b]/50">
          <div className="relative h-60 rounded-t-full overflow-hidden border-2 border-amber-500/40 bg-stone-100 dark:bg-stone-900 shadow-inner">
            <img 
              src={puja.image || puja.cover_image || 'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800'} 
              alt={isBn ? (puja.title_bn || puja.titleEn) : (puja.title_en || puja.titleBn)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex items-center gap-1 mt-3 px-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Tag className="w-3.5 h-3.5" />
            <span>
              {isBn ? (puja.event_type_bn || puja.event_type_en || 'সাধারণ পূজা') : (puja.event_type_en || puja.event_type_bn || 'General Puja')}
            </span>
          </div>
        </div>

        <div className="px-6 py-3 space-y-3">
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-amber-100 group-hover:text-amber-600 transition-colors line-clamp-1">
            {isBn ? (puja.title_bn || puja.titleEn) : (puja.title_en || puja.titleBn)}
          </h3>

          <p className="text-xs text-stone-600 dark:text-cream-200/80 leading-relaxed line-clamp-2">
            {isBn ? (puja.description_bn || puja.descriptionEn) : (puja.description_en || puja.descriptionBn)}
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{puja.event_date_time || puja.eventDateTime || 'Scheduled Soon'}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="border-t border-dashed border-amber-300 dark:border-amber-500/20"></div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between gap-4 mt-2">
        <span className="text-base font-bold font-serif text-amber-700 dark:text-amber-400 px-2 py-1">
          {formatPrice(puja.price)}
        </span>

        <Link 
          to={`/pujas/${puja.id}`} 
          className="py-2.5 px-4 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <span>{isBn ? 'বিস্তারিত ও বুকিং' : 'Details & Book'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}