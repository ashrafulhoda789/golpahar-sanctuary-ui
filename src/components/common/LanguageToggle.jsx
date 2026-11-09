import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedLang) => {
    setLang(selectedLang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-cream-200 dark:bg-maroon-900 border border-maroon-900/10 dark:border-amber-500/30 text-maroon-900 dark:text-amber-400 font-medium text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
        aria-label="Select Language"
      >
        <Globe className="w-3 h-3" />
        <span className="uppercase tracking-wider font-semibold">{lang}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-xl bg-cream-100 dark:bg-[#23060b] border border-cream-300 dark:border-amber-500/20 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <button
            onClick={() => handleSelect('bn')}
            className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs font-medium transition-colors ${
              lang === 'bn'
                ? 'text-maroon-900 dark:text-amber-400 font-bold bg-cream-200/60 dark:bg-maroon-900/50'
                : 'text-maroon-800 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900/30'
            }`}
          >
            <span>বাংলা</span>
            {lang === 'bn' && <Check className="w-3.5 h-3.5 text-maroon-900 dark:text-amber-400" />}
          </button>
          
          <button
            onClick={() => handleSelect('en')}
            className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs font-medium transition-colors ${
              lang === 'en'
                ? 'text-maroon-900 dark:text-amber-400 font-bold bg-cream-200/60 dark:bg-maroon-900/50'
                : 'text-maroon-800 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900/30'
            }`}
          >
            <span>English</span>
            {lang === 'en' && <Check className="w-3.5 h-3.5 text-maroon-900 dark:text-amber-400" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;