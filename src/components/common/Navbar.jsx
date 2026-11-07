import { useState } from 'react';
import {
    ChevronDown,
    Heart,
    Calendar,
    Search,
    Menu,
    X,
    PhoneCall
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'About',
            dropdown: [
                { name: 'About Us', path: '/#' },
                { name: 'History', path: '/#' }
            ]
        },
        { name: 'Deities', path: '/#' },
        {
            name: 'Puja',
            dropdown: [
                { name: 'Puja & Rituals', path: '/#' },
                { name: 'Puja List', path: '/#' }
            ]
        },
        {
            name: 'Festivals',
            dropdown: [
                { name: 'Upcoming Events', path: '/#' },
                { name: 'Past Events', path: '/#' }
            ]
        },
        { name: 'Gallery', path: '/#' },
        { name: 'Notice', path: '/#' }
    ];

    return (
        <nav className="bg-[#f8d287] sticky top-0 z-50 transition-all">
            <div className="max-w-450 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="text-3xl sm:text-4xl text-maroon-900 font-heading font-bold select-none">
                            ॐ
                        </span>
                        <div className="border-l border-maroon-900/30 pl-2.5 sm:pl-3 leading-tight">
                            <span className="block font-heading text-xs sm:text-base font-bold text-maroon-900 tracking-wide">
                                Golpahar Mohashoshan <br /> Kali Mandir
                            </span>
                            <span className="block text-[10px] sm:text-[11px] tracking-wider text-maroon-800 uppercase font-medium">
                                Chittagong
                            </span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1 font-medium text-sm text-maroon-900">
                        {navLinks.map((item, index) => {
                            if (item.dropdown) {
                                return (
                                    <div key={index} className="relative group">
                                        <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full hover:bg-cream-200 transition-colors">
                                            <span>{item.name}</span>
                                            <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
                                        </button>
                                        <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-cream-100 border border-cream-300 rounded-xl shadow-lg py-2 mt-1 z-50">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    className="block px-4 py-2 hover:bg-cream-200 hover:text-maroon-800 transition-colors"
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
                                            ? 'bg-maroon-900 text-white font-semibold'
                                            : 'hover:bg-cream-200'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                        <Link to="/" className="btn-icon" title="Today's Puja Schedule">
                            <Calendar className="w-4 h-4" />
                        </Link>

                        <button className="btn-icon" title="Search">
                            <Search className="w-4 h-4" />
                        </button>

                        <Link to="/" className="btn-outline">
                            <PhoneCall className="w-4 h-4" />
                            <span>Contact</span>
                        </Link>

                        <Link to="/" className="btn-primary">
                            <Heart className="w-4 h-4 fill-white/20 text-white" />
                            <span>Donate</span>
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        <Link to="/" className="btn-primary text-xs px-3 py-1.5">
                            <Heart className="w-3.5 h-3.5  fill-white/20" />
                            <span>Donate</span>
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-maroon-900 hover:bg-cream-200 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-cream-100 border-b border-cream-300 px-4 pt-2 pb-6 space-y-2">
                    {navLinks.map((item, index) => {
                        if (item.dropdown) {
                            const dropdownKey = item.name.toLowerCase();
                            return (
                                <div key={index}>
                                    <button
                                        onClick={() => toggleDropdown(dropdownKey)}
                                        className="w-full flex justify-between items-center px-3 py-2 font-medium text-maroon-900 hover:bg-cream-200 rounded-lg transition-colors"
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
                                                    className="block py-1.5 text-sm text-maroon-800 hover:text-maroon-900 font-medium"
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
                                        ? 'bg-maroon-900 text-white'
                                        : 'text-maroon-900 hover:bg-cream-200'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg font-medium text-maroon-900 hover:bg-cream-200 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;