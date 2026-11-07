import { useState } from 'react';
import { Layers, Home, Sparkles, X, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const HomeSwitcherBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const homeDemos = [
        { id: 'home1', name: 'Home 1', path: '/' },
        { id: 'home2', name: 'Home 2', path: '/home2' },
    ];

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-50 bg-maroon-900 text-amber-200 px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 flex items-center gap-2 font-heading text-xs font-bold hover:bg-maroon-950 transition-all cursor-pointer animate-bounce"
            >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Demo Switcher</span>
                <ChevronUp className="w-4 h-4" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-maroon-950/95 backdrop-blur-md border-t-2 border-amber-500/40 shadow-2xl py-3 px-4 sm:px-6 transition-all">
            <div className="max-w-350 mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

                <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-maroon-900 border border-amber-500/30">
                        <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                        <span className="text-xs font-semibold text-maroon-800 block uppercase tracking-wider">
                            Temple Demo Switcher
                        </span>
                        <p className="text-[11px] text-maroon-800">
                            Explore different layout variations for Golpahar Mandir
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    {homeDemos.map((demo) => {
                        const isActive = location.pathname === demo.path;
                        return (
                            <Link
                                key={demo.id}
                                to={demo.path}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all flex items-center gap-1.5 shadow-xs ${isActive
                                        ? 'bg-amber-500 text-maroon-950 shadow-md scale-105'
                                        : 'bg-maroon-900 text-amber-200 border border-amber-500/30 hover:bg-maroon-800'
                                    }`}
                            >
                                <Home className="w-3.5 h-3.5" />
                                <span>{demo.name}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl bg-maroon-900 text-gray-400 hover:text-amber-200 hover:bg-maroon-800 transition-colors ml-2"
                        title="Minimize Switcher"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HomeSwitcherBar;