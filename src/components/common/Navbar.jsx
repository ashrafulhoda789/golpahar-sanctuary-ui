import { useState } from 'react';
import {
    ChevronDown,
    Heart,
    Menu,
    X,
    PhoneCall
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const { t } = useLanguage();

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: t?.nav?.home || 'Home', path: '/' },
        {
            name: t?.nav?.about || 'About',
            dropdown: [
                { name: 'About Us', path: '/#' },
                { name: 'History', path: '/#' }
            ]
        },
        { name: t?.nav?.deities || 'Deities', path: '/#' },
        {
            name: t?.nav?.puja || 'Puja',
            dropdown: [
                { name: 'Puja & Rituals', path: '/#' },
                { name: 'Puja List', path: '/#' }
            ]
        },
        {
            name: t?.nav?.festivals || 'Festivals',
            dropdown: [
                { name: 'Upcoming Events', path: '/#' },
                { name: 'Past Events', path: '/#' }
            ]
        },
        { name: t?.nav?.gallery || 'Gallery', path: '/#' },
        { name: t?.nav?.notice || 'Notice', path: '/#' }
    ];

    return (
        <nav className="bg-[#f8d287] dark:bg-[#23060b] sticky top-0 z-50 transition-colors duration-300 border-b border-maroon-900/10 dark:border-amber-500/20">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="text-3xl sm:text-4xl text-maroon-900 dark:text-amber-400 font-heading font-bold select-none">
                            ॐ
                        </span>
                        <div className="border-l border-maroon-900/30 dark:border-amber-400/30 pl-2 sm:pl-3 leading-tight">
                            <span className="block font-heading text-[10px] min-[360px]:text-xs sm:text-base font-bold text-maroon-900 dark:text-cream-100 tracking-wide">
                                {t?.header?.titleLine1 || 'Golpahar Mohashoshan'} <br />
                                {t?.header?.titleLine2 || 'Kali Mandir'}
                            </span>
                            <span className="block text-[9px] sm:text-[11px] tracking-wider text-maroon-800 dark:text-amber-400/80 uppercase font-medium">
                                {t?.header?.location || 'Chittagong'}
                            </span>
                        </div>
                    </Link>

                    <div className="hidden xl:flex items-center gap-1 font-medium text-sm text-maroon-900 dark:text-cream-100">
                        {navLinks.map((item, index) => {
                            if (item.dropdown) {
                                return (
                                    <div key={index} className="relative group">
                                        <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full hover:bg-cream-200 dark:hover:bg-maroon-900/60 transition-colors">
                                            <span>{item.name}</span>
                                            <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
                                        </button>
                                        <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-cream-100 dark:bg-[#23060b] border border-cream-300 dark:border-amber-500/20 rounded-xl shadow-lg py-2 mt-1 z-50">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    className="block px-4 py-2 hover:bg-cream-200 dark:hover:bg-maroon-900 text-maroon-900 dark:text-cream-100 transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`px-3 xl:px-4 py-2 rounded-full transition-colors ${isActive(item.path)
                                        ? 'bg-maroon-900 text-white dark:bg-amber-400 dark:text-[#23060b] font-semibold'
                                        : 'hover:bg-cream-200 dark:hover:bg-maroon-900/60'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden xl:flex items-center gap-2 xl:gap-3">
                        <LanguageToggle />
                        <ThemeToggle />
                        <Link to="/" className="btn-outline">
                            <PhoneCall className="w-4 h-4" />
                            <span>{t?.nav?.contact || 'Contact'}</span>
                        </Link>

                        <Link to="/" className="btn-primary">
                            <Heart className="w-4 h-4 fill-white/20 text-white" />
                            <span>{t?.nav?.donate || 'Donate'}</span>
                        </Link>
                    </div>

                    <div className="xl:hidden flex items-center gap-1.5 sm:gap-2">
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1.5 sm:p-2 text-maroon-900 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900 rounded-lg transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {mobileMenuOpen && (
                <div className="xl:hidden bg-cream-100 dark:bg-[#23060b] border-b border-cream-300 dark:border-amber-500/20 px-4 pt-2 pb-6 space-y-2 shadow-lg">
                    {navLinks.map((item, index) => {
                        if (item.dropdown) {
                            const dropdownKey = item.name.toLowerCase();
                            return (
                                <div key={index}>
                                    <button
                                        onClick={() => toggleDropdown(dropdownKey)}
                                        className="w-full flex justify-between items-center px-3 py-2 font-medium text-maroon-900 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900 rounded-lg transition-colors"
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === dropdownKey ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeDropdown === dropdownKey && (
                                        <div className="pl-6 space-y-1 py-1">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block py-1.5 text-sm text-maroon-800 dark:text-cream-200 hover:text-maroon-900 dark:hover:text-amber-400 font-medium"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${isActive(item.path)
                                    ? 'bg-maroon-900 text-white dark:bg-amber-400 dark:text-[#23060b]'
                                    : 'text-maroon-900 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg font-medium text-maroon-900 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-maroon-900 transition-colors"
                    >
                        {t?.nav?.contact || 'Contact Us'}
                    </Link>

                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-cream-200/50 dark:bg-maroon-900/30 my-2">
                        <span className="text-sm font-medium text-maroon-900 dark:text-cream-100">
                            {t?.language || 'Language'}
                        </span>
                        <LanguageToggle />
                    </div>

                    <div className="flex sm:hidden items-center justify-between px-3 py-2 rounded-lg bg-cream-200/50 dark:bg-maroon-900/30 my-2">
                        <span className="text-sm font-medium text-maroon-900 dark:text-cream-100">
                            Theme
                        </span>
                        <ThemeToggle />
                    </div>

                    <div className="pt-2 border-t border-cream-300 dark:border-amber-500/20 mt-3">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold"
                        >
                            <Heart className="w-4 h-4 fill-white/25 text-white" />
                            <span>{t?.nav?.donate || 'Donate Now'}</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;