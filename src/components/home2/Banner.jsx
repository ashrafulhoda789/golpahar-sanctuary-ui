import { Link } from 'react-router';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

const HeroBanner = () => {
    return (
        <section className="relative bg-cream-100 border-b border-b-[#f3deb1]">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden items-stretch">

                    <div className="lg:col-span-6 bg-maroon-900 text-amber-100 py-16 px-8 sm:px-12 lg:pl-24 lg:pr-12 flex flex-col justify-center space-y-6">

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5  bg-cream-100/10 border border-amber-500/30 w-fit">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-xs sm:text-sm font-semibold text-amber-200 uppercase tracking-widest">
                                Welcome
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-200 tracking-wide leading-tight">
                            Golpahar Mohashoshan <br /> Kali Mandir
                        </h1>

                        <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                            A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <Link
                                to="/home2"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 text-maroon-900 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg group"
                            >
                                <span>Book Puja</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                to="/home2"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border-2 border-amber-500/60 text-amber-200 font-bold text-sm hover:bg-maroon-800 transition-all shadow-md group"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Donate</span>
                            </Link>
                        </div>

                    </div>

                    <div className="lg:col-span-6 bg-cream-100 pt-8 px-8 flex flex-col items-center justify-end relative border-t lg:border-t-0 lg:border-l border-cream-300">

                        <div className="relative w-full max-w-md h-[360px] sm:h-[480px] rounded-t-full border-2 border-b-0 border-amber-500/60 p-3 pb-0 flex flex-col items-center justify-center bg-cream-200/50 shadow-inner overflow-hidden group">

                            <img
                                src="https://i.ibb.co.com/nMC51Pmn/temple2.webp"
                                alt="Temple Deity"
                                className="w-full h-full object-cover rounded-t-full group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-transparent to-transparent flex items-end justify-center pb-6">
                                <span className="text-xs font-semibold text-amber-200 px-3.5 py-1 rounded-full bg-maroon-900/80 border border-amber-500/40 shadow-md">
                                    Golpahar Mandir Shrine
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default HeroBanner;