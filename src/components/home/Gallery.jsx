import { useState } from 'react';
import { ZoomIn, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

import img1 from '../../assets/gallery/gallery1.jfif';
import img2 from '../../assets/gallery/gallery2.jfif';
import img3 from '../../assets/gallery/gallery3.jfif';
import img4 from '../../assets/gallery/gallery4.jfif';
import img5 from '../../assets/gallery/gallery5.jfif';
import img6 from '../../assets/gallery/gallery6.jfif';
import img7 from '../../assets/gallery/gallery7.jfif';

const galleryImages = [
    { id: 1, src: img1, title: "Mandir View", category: "Premises", className: "h-64" },
    { id: 2, src: img2, title: "Evening Aarti", category: "Ritual", className: "h-80 sm:h-96 border-2 border-amber-500/40 shadow-md" },
    { id: 3, src: img3, title: "Deity Shrine", category: "Devotion", className: "h-72" },
    { id: 4, src: img4, title: "Special Puja", category: "Festival", className: "h-72" },
    { id: 5, src: img5, title: "Festival Celebration", category: "Event", className: "h-60" },
    { id: 6, src: img6, title: "Temple Lighting", category: "Premises", className: "h-72" },
    { id: 7, src: img7, title: "Community Gathering", category: "Devotion", className: "h-64 sm:h-72 lg:col-span-3 max-w-2xl mx-auto w-full" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { t } = useLanguage();

    return (
        <section className="relative bg-maroon-800 py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                        <span className="text-xs sm:text-sm font-semibold text-cream-200 uppercase tracking-widest">
                            {t?.gallery?.tag || 'DIVINE MOMENTS'}
                        </span>
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-cream-200">
                        {t?.gallery?.title || 'Our Gallery'}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className={`group relative rounded-2xl overflow-hidden shadow-sm border border-cream-200 cursor-pointer bg-cream-200 ${image.className}`}
                        >
                            <img
                                src={image.src}
                                alt={image.title || `Gallery image ${index + 1}`}
                                loading={index < 2 ? "eager" : "lazy"} // প্রথম ২টি ছবি দ্রুত লোড হবে (eager), বাকিগুলো লেজি লোড হবে
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="p-3 rounded-full bg-cream-100/90 text-maroon-900 shadow-md">
                                    <ZoomIn className="w-5 h-5 text-amber-600" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center md:justify-end py-2'>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 border border-cream-200 text-maroon-900 font-heading font-semibold text-sm hover:bg-maroon-900 hover:text-amber-200 transition-all shadow-xs group"
                    >
                        <span>{t?.gallery?.viewAll || 'All Gallery'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>

            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-4xl w-full max-h-[90vh] bg-maroon-950/90 border border-amber-500/30 rounded-2xl p-2 sm:p-4 shadow-2xl flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-amber-200 hover:bg-maroon-900 hover:text-white transition-colors z-10 cursor-pointer"
                            aria-label="Close Preview"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            loading="eager"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;