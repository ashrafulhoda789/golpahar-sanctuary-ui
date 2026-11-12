import { MapPin, Clock } from 'lucide-react';

export default function LocationSanctuarySection({ t }) {
    return (
        <div className='py-10'>
            <div className="max-w-6xl mx-auto  grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-200 dark:bg-[#1a0408] p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-amber-500/20 shadow-sm">
                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                        <div className="p-2 rounded-t-full border-2 border-amber-500/60 bg-amber-50/50 dark:bg-[#23060b] shadow-lg">
                            <div className="overflow-hidden rounded-t-full aspect-[4/5] bg-amber-600/20">
                                <img
                                    src="https://i.ibb.co.com/ZpDhhp2K/temple3.webp"
                                    alt="Golpahar Temple"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs uppercase tracking-wider">
                        <MapPin className="w-4 h-4" /> Panchlaish, Chattogram
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-maroon-900 dark:text-amber-100">
                        {t.locationTitle}
                    </h2>
                    <p className="text-sm sm:text-base font-sans text-stone-600 dark:text-cream-200/80 leading-relaxed">
                        {t.locationDesc}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-medium text-maroon-800 dark:text-amber-200/60">
                        <Clock className="w-4 h-4 text-amber-500" /> {t.dailyWorship}
                    </div>
                </div>
            </div>
        </div>
    );
}