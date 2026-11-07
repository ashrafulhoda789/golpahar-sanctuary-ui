import { useState } from 'react';
import { ZoomIn, X, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';

import img1 from '../../assets/gallery/gallery1.jfif';
import img2 from '../../assets/gallery/gallery2.jfif';
import img3 from '../../assets/gallery/gallery3.jfif';
import img5 from '../../assets/gallery/gallery5.jfif';
import img6 from '../../assets/gallery/gallery6.jfif';
import img7 from '../../assets/gallery/gallery7.jfif';

const galleryData = [
    { id: 1, src: img1, title: "Mandir View", category: "Premises" },
    { id: 2, src: img2, title: "Evening Aarti", category: "Ritual" },
    { id: 3, src: img3, title: "Deity Shrine", category: "Devotion" },
    { id: 4, src: img7, title: "Special Puja", category: "Festival" },
    { id: 5, src: img5, title: "Festival Celebration", category: "Event" },
    { id: 6, src: img6, title: "Temple Lighting", category: "Premises" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="relative bg-cream-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                <div className="flex flex-col justify-center items-center mb-12 gap-4 text-center sm:text-left">

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-amber-500/30 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-maroon-900 uppercase tracking-widest">
                            Sacred Archives
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-maroon-900">
                        Golpahar Mandir Photo Gallery
                    </h2>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImage(item)}
                            className="group relative h-72 overflow-hidden shadow-md border border-amber-500/30 bg-maroon-950 cursor-pointer"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-maroon-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-5">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-maroon-900 border border-amber-500 text-[11px] font-semibold text-amber-300 w-fit">
                                    <ImageIcon className="w-3 h-3" /> {item.category}
                                </span>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="font-heading font-bold text-amber-400 text-base">
                                            {item.title}
                                        </h3>
                                        <p className="text-[11px] text-white">Golpahar Mandir</p>
                                    </div>
                                    <span className="p-2.5 rounded-full bg-amber-500 text-maroon-950 shadow-lg group-hover:scale-110 transition-transform">
                                        <ZoomIn className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-end py-2'>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon-900 text-amber-200 font-heading font-semibold text-sm hover:bg-maroon-950 transition-all shadow-md group"
                    >
                        <span>All Gallery</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>

            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl w-full max-h-[90vh] bg-maroon-950 border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-maroon-900 text-amber-200 hover:bg-amber-500 hover:text-maroon-950 transition-colors z-10 shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />

                        <div className="mt-3 text-center space-y-0.5">
                            <h4 className="font-heading font-bold text-amber-200 text-lg">
                                {selectedImage.title}
                            </h4>
                            <span className="text-xs text-amber-400/80 uppercase tracking-widest">
                                Category: {selectedImage.category}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;