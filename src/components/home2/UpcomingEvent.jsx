import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router';

// Sample event banner/flyer image (replace with your actual asset if needed)
import eventFlyer from '../../assets/gallery/gallery4.jfif';

const UpcomingEvent = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Countdown timer logic simulation
    const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                return { ...prev, seconds: 59 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative bg-maroon-900 py-20 px-4 sm:px-6 lg:px-8  text-amber-100 overflow-hidden">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-350 mx-auto w-full relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-950/80 border border-amber-500/30">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-amber-200 uppercase tracking-widest">
                            Sacred Occasion
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-amber-200">
                        Upcoming Festival & Event
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                        Join us in our upcoming divine celebrations, community prayers, and spiritual gatherings.
                    </p>
                </div>

                <div className="bg-maroon-950/70 border-2 border-amber-500/40  p-8 sm:p-12 shadow-2xl backdrop-blur-md">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        <div className="lg:col-span-7 space-y-6">
                            
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                                    <Calendar className="w-4 h-4 text-amber-400" />
                                    November 7-8, 2026 (Sat & Sun)
                                </span>
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-maroon-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                                    <Clock className="w-4 h-4 text-amber-400" />
                                    6:30 PM Onwards
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-amber-200 leading-tight">
                                Shree Shree Shyama Puja & Annakut Mahotsav
                            </h3>

                            <div className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                                <p className="text-amber-400 font-medium text-xs uppercase tracking-wider">
                                    Organized by Golpahar Mohashoshan & Mandir Management Committee
                                </p>
                                <p>
                                    Featuring Divine Shyama Maa Maha Puja, Evening Aarti, Vedic Rituals, Devotional Chants, Clothes Distribution for the needy, and a grand Cultural Program.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-amber-300/80">
                                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>Golpahar Moor, O.R. Nizam Road, Chittagong</span>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                                    Event Starts In:
                                </p>
                                <div className="grid grid-cols-4 gap-3 max-w-md">
                                    <div className="bg-maroon-900 border border-amber-500/30 p-3 text-center">
                                        <span className="text-xl sm:text-2xl font-heading font-bold text-amber-200 block">
                                            {timeLeft.days}
                                        </span>
                                        <span className="text-[10px] uppercase text-gray-400 tracking-wider">Days</span>
                                    </div>
                                    <div className="bg-maroon-900 border border-amber-500/30 p-3 text-center">
                                        <span className="text-xl sm:text-2xl font-heading font-bold text-amber-200 block">
                                            {timeLeft.hours}
                                        </span>
                                        <span className="text-[10px] uppercase text-gray-400 tracking-wider">Hours</span>
                                    </div>
                                    <div className="bg-maroon-900 border border-amber-500/30 p-3 text-center">
                                        <span className="text-xl sm:text-2xl font-heading font-bold text-amber-200 block">
                                            {timeLeft.minutes}
                                        </span>
                                        <span className="text-[10px] uppercase text-gray-400 tracking-wider">Mins</span>
                                    </div>
                                    <div className="bg-maroon-900 border border-amber-500/30  p-3 text-center">
                                        <span className="text-xl sm:text-2xl font-heading font-bold text-amber-200 block">
                                            {timeLeft.seconds}
                                        </span>
                                        <span className="text-[10px] uppercase text-gray-400 tracking-wider">Secs</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link
                                    to="/notices"
                                    className="inline-flex items-center gap-2.5 px-6 py-3.5  bg-amber-500 text-maroon-950 font-heading font-bold text-sm hover:bg-amber-400 transition-all shadow-lg group"
                                >
                                    <span>View Full Schedule & Details</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                        </div>

                        {/* Right Column: Arch Frame Flyer Showcase */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center">
                            <div
                                onClick={() => setIsLightboxOpen(true)}
                                className="relative w-full max-w-sm h-[400px] sm:h-[460px] rounded-t-full border-2 border-amber-500/60 p-3 pb-0 bg-maroon-900 shadow-2xl cursor-pointer group overflow-hidden"
                            >
                                <img
                                    src={eventFlyer}
                                    alt="Shyama Puja Flyer"
                                    className="w-full h-full object-cover rounded-t-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-4 py-2 rounded-full bg-amber-500 text-maroon-950 font-bold text-xs shadow-lg">
                                        Click to Preview Flyer
                                    </span>
                                </div>
                            </div>
                            <span className="text-xs text-amber-300/80 mt-3 font-medium">
                                Tap image to view full flyer
                            </span>
                        </div>

                    </div>
                </div>

            </div>

            {/* Lightbox Modal for Flyer */}
            {isLightboxOpen && (
                <div
                    onClick={() => setIsLightboxOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-3xl w-full max-h-[90vh] bg-maroon-950 border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-maroon-900 text-amber-200 hover:bg-amber-500 hover:text-maroon-950 transition-colors z-10 shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={eventFlyer}
                            alt="Event Flyer Preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}

        </section>
    );
};

export default UpcomingEvent;