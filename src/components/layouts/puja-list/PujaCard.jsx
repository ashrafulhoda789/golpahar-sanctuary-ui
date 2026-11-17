import { Calendar, Tag, ArrowRight } from 'lucide-react';

export default function PujaCard({ puja, lang, onBookClick }) {
  const isBn = lang === 'bn';
  
  const formatPrice = (priceVal) => {
    if (priceVal === undefined || priceVal === null || priceVal === 0) return 'Free';
    const priceStr = String(priceVal);
    return priceStr.replace(/[\u09E6-\u09EF]/g, d => "0123456789"[d.charCodeAt(0) - 2534]);
  };

  const pujaDate = isBn ? (puja.date_bn || puja.date_en) : (puja.date_en || puja.date_bn);

  return (
    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="p-3 bg-amber-50/50 dark:bg-[#23060b]/50">
          <div className="relative h-60 rounded-t-full overflow-hidden border-2 border-amber-500/40 bg-stone-100 dark:bg-stone-900 shadow-inner">
            <img 
              src={puja.image || 'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800'} 
              alt={isBn ? (puja.title_bn || puja.title_en) : (puja.title_en || puja.title_bn)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex items-center gap-1 mt-3 px-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Tag className="w-3.5 h-3.5" />
            <span>
              {isBn ? (puja.type_bn || puja.type_en || 'সাধারণ পূজা') : (puja.type_en || puja.type_bn || 'General Puja')}
            </span>
          </div>
        </div>

        <div className="px-6 py-3 space-y-3">
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-amber-100 group-hover:text-amber-600 transition-colors line-clamp-1">
            {isBn ? (puja.title_bn || puja.title_en) : (puja.title_en || puja.title_bn)}
          </h3>

          <p className="text-xs text-stone-600 dark:text-cream-200/80 leading-relaxed line-clamp-2">
            {isBn ? (puja.description_bn || puja.description_en) : (puja.description_en || puja.description_bn)}
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{pujaDate || 'Scheduled Soon'}</span>
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

        <button 
          onClick={onBookClick}
          className="py-2.5 px-4 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>{isBn ? 'পূজা বুক করুন' : 'Book Puja'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}