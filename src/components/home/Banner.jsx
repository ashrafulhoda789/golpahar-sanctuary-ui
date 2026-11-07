import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar } from 'lucide-react';

const templeImages = [
    {
        url: "https://i.ibb.co.com/nMC51Pmn/temple2.webp",
        caption: "গোলপাহাড় মহাশ্মশান কালী মন্দির"
    },
    {
        url: "https://i.ibb.co.com/tw9CgxkX/temple1.jpg",
        caption: "সন্ধ্যা আরতি"
    },
    {
        url: "https://i.ibb.co.com/ZpDhhp2K/temple3.webp",
        caption: "মন্দির প্রাঙ্গণ"
    }
];

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templeImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? templeImages.length - 1 : prev - 1));

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev + 1) % templeImages.length);

    return (
        <section className="relative bg-cream-100 overflow-hidden py-6 lg:py-0 ">

            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:min-h-125">

                    <div className="relative z-10 lg:w-[42%] flex flex-col justify-center py-8 lg:py-0 pt-0 lg:pt-10 lg:pr-6 text-center lg:text-left">

                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <span className="h-px w-8 sm:w-10 bg-amber-500" />
                            <span className="text-sm sm:text-base font-semibold text-maroon-900 uppercase tracking-wider">
                                WELCOME
                            </span>
                            <span className="h-px w-8 sm:w-10 bg-amber-500 lg:hidden" />
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-heading font-bold text-maroon-900 leading-[1.3]">
                            Where faith meets community
                        </h1>

                        <p className="mt-5 text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Welcome to Golpahar Mohashoshan Kali Mandir. A sacred sanctuary for spiritual awakening, divine peace, and community devotion in Chittagong.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <Link to="/" className="btn-primary">
                                <span>Book Puja</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link to="/" className="btn-outline">
                                <Calendar className="w-4 h-4" />
                                <span>Donate Now</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative group lg:w-[58%] lg:-ml-6 h-60 sm:h-80 lg:h-auto">
                        <div className="absolute inset-0 bg-maroon-900 rounded-[28px_28px_0_0/20px_20px_0_0] lg:rounded-[56px_28px_28px_56px/50%_28px_28px_50%]" />

                        <div className="absolute inset-x-0 top-3 bottom-0 lg:top-0 lg:left-4 lg:right-0 overflow-hidden bg-maroon-950 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-cream-100 rounded-[24px_24px_0_0/16px_16px_0_0] lg:rounded-[48px_28px_28px_48px/50%_28px_28px_50%]">
         
                            {templeImages.map((image, index) => (
                                <img
                                    key={image.url}
                                    src={image.url}
                                    alt={image.caption}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            ))}

                            <div
                                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(103, 62, 70, 0.85) 0%, rgba(74, 14, 23, 0.45) 40%, rgba(74, 14, 23, 0.2) 70%, rgba(74, 14, 23, 0) 100%)",
                                }}
                            />
                        </div>

                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-maroon-900/95 border border-amber-500/40 text-white text-xs sm:text-sm font-medium shadow-md z-20">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>Golpahar, Chattogram</span>
                        </div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-4 lg:left-14 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-amber-200 hover:bg-black/70 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all z-30"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-amber-200 hover:bg-black/70 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all z-30"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {templeImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-1.5 rounded-full transition-all ${
                                        index === currentIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/60'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBanner;