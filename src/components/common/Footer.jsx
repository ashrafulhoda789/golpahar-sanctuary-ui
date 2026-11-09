import { Link } from 'react-router';
import { MapPin, Mail, Globe, Video, Camera } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-maroon-900 text-amber-100 pt-14 pb-8 border-t-4 border-amber-500/50">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-maroon-800/80 items-start">

                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center text-amber-400 font-heading text-3xl font-bold">
                                ॐ
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg text-amber-200 tracking-wide">
                                    Golpahar Mohashoshan Porichalona Porishod
                                </h3>
                                <p className="text-xs text-amber-400/80 tracking-widest uppercase mt-0.5">
                                    Chittagong, Bangladesh
                                </p>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
                            {t?.footer?.desc || 'Dedicated to spiritual service, preservation of religious heritage, and selfless social welfare.'}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
                            <span>{t?.footer?.tags?.[0] || 'Service'}</span>
                            <span>•</span>
                            <span>{t?.footer?.tags?.[1] || 'Reform'}</span>
                            <span>•</span>
                            <span>{t?.footer?.tags?.[2] || 'Humanity'}</span>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                        <h4 className="font-heading font-bold text-amber-300 text-base uppercase tracking-wider border-b border-amber-500/40 pb-1 w-full max-w-[160px]">
                            {t?.footer?.quickLinks || 'Quick Links'}
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                            <li>
                                <Link to="/about" className="hover:text-amber-400 transition-colors">{t?.footer?.aboutUs || 'About Us'}</Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-amber-400 transition-colors">{t?.footer?.services || 'Services'}</Link>
                            </li>
                            <li>
                                <Link to="/notices" className="hover:text-amber-400 transition-colors">{t?.footer?.notices || 'Notices'}</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-amber-400 transition-colors">{t?.footer?.contactUs || 'Contact Us'}</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                        <h4 className="font-heading font-bold text-amber-300 text-base uppercase tracking-wider border-b border-amber-500/40 pb-1 w-full max-w-[180px]">
                            {t?.footer?.pledgeTitle || 'Our Pledge'}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                            {t?.footer?.pledgeDesc || 'Preserving ancient religious traditions, fostering community harmony, and remaining devoted to humanitarian service.'}
                        </p>
                    </div>
     
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                        <h4 className="font-heading font-bold text-amber-300 text-base uppercase tracking-wider border-b border-amber-500/40 pb-1 w-full max-w-[160px]">
                            {t?.footer?.contactInfo || 'Contact Info'}
                        </h4>

                        <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                            <div className="flex items-center justify-center lg:justify-start gap-2.5">
                                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>{t?.footer?.address || 'Golpahar Moor, O.R. Nizam Road, Chattogram'}</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-2.5">
                                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>info@golpahar.org</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-maroon-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-maroon-950 transition-all">
                                <Globe className="w-4 h-4" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-maroon-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-maroon-950 transition-all">
                                <Video className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-maroon-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-maroon-950 transition-all">
                                <Camera className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center text-xs text-gray-400 gap-4">
                    <p>{t?.footer?.rights || '© 2026 Golpahar Moheshmoshan Porichalona Porishod. All Rights Reserved.'}</p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;