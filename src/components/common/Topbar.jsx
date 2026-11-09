import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOpenStatus = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            const morningStart = 6 * 60 + 30;
            const morningEnd = 12 * 60 + 30;

            const eveningStart = 15 * 60 + 30;
            const eveningEnd = 19 * 60 + 30;

            const open =
                (currentMinutes >= morningStart && currentMinutes <= morningEnd) ||
                (currentMinutes >= eveningStart && currentMinutes <= eveningEnd);

            setIsOpen(open);
        };

        checkOpenStatus();
        const interval = setInterval(checkOpenStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-maroon-900 text-amber-200/90 text-xs sm:text-sm py-2 px-2 sm:px-4 border-b border-rose-950/45 overflow-hidden w-full box-border">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 w-full">

                <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center sm:text-left min-w-0">
                    <a
                        href="tel:0241356335"
                        className="inline-flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
                    >
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                        <span className="font-medium tracking-wide">02-41356335</span>
                    </a>

                    <span className="hidden sm:inline text-amber-400/40">|</span>

                    <div className="flex items-center justify-center gap-1.5 min-w-0 max-w-full px-1">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                        <span className="truncate text-ellipsis overflow-hidden">
                            Golpahar moor, O R nizam road, Chittagong, Bangladesh
                        </span>
                    </div>
                </div>

                {/* Hours & Status */}
                <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-center gap-2 sm:gap-3 border-t border-amber-900/40 md:border-t-0 pt-1.5 md:pt-0 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                        <div className="flex flex-col sm:flex-row sm:gap-1 text-[11px] sm:text-xs leading-tight text-center sm:text-left">
                            <span>6:30 AM-12:30 PM,</span>
                            <span>3:30 PM-7:30 PM</span>
                        </div>
                    </div>

                    <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-50 shrink-0 shadow-sm ${isOpen ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                    >
                        <span
                            className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                                }`}
                        />
                        <span className="whitespace-nowrap">
                            {isOpen ? 'Open Now' : 'Currently Closed'}
                        </span>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Topbar;