import  { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { ChevronLeft, ChevronRight, Play, Images, Sparkles } from 'lucide-react';

export default function GalleryPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.galleryPage || translations?.en?.galleryPage;

    const [currentAlbumSlide, setCurrentAlbumSlide] = useState(0);

    const albums = [
        {
            id: '1',
            titleEn: 'Pictures Of Divine Mother',
            titleBn: 'দিব্য মায়ের আলোকচিত্র',
            photosCount: 9,
            cover: 'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800'
        },
        {
            id: '2',
            titleEn: 'Picture Of Sri Radha and Sri Krishna',
            titleBn: 'শ্রী রাধা ও শ্রী কৃষ্ণের আলোকচিত্র',
            photosCount: 7,
            cover: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800'
        },
        {
            id: '3',
            titleEn: 'Pictures Of Lord Shiva',
            titleBn: 'দেবাদিদেব মহাদেবের আলোকচিত্র',
            photosCount: 1,
            cover: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800'
        },
        {
            id: '4',
            titleEn: 'Temple Premises & Architecture',
            titleBn: 'মন্দির প্রাঙ্গণ ও স্থাপত্য',
            photosCount: 12,
            cover: 'https://images.unsplash.com/photo-1590076450449-94574923f62e?q=80&w=800'
        }
    ];

    const nextAlbum = () => {
        setCurrentAlbumSlide((prev) => (prev + 1) % Math.max(1, albums.length - 2));
    };

    const prevAlbum = () => {
        setCurrentAlbumSlide((prev) => (prev - 1 + Math.max(1, albums.length - 2)) % Math.max(1, albums.length - 2));
    };

    const galleryPhotos = [
        'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800',
        'https://i.ibb.co.com/2HRyYJw/899861698-1597767324988073-3986089999534144445-n.jpg',
        'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800'
    ];

    const videos = [
        {
            id: '1',
            titleEn: 'Grand Sandhya Aarti & Celebration',
            titleBn: 'সন্ধ্যা আরতি ও বিশেষ উৎসব অনুষ্ঠান',
            thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800',
            duration: '4:30'
        },
        {
            id: '2',
            titleEn: 'Spiritual Discourse & Bhajans',
            titleBn: 'ধর্মীয় আলোচনা সভা ও ভজন কীর্তন',
            thumbnail: 'https://images.unsplash.com/photo-1605302977593-fe0329b1effd?q=80&w=800',
            duration: '12:15'
        }
    ];

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">


            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-300 transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbGallery}
                        </span>
                    </nav>
                </div>

                <header className="text-amber-100 py-10 px-4 sm:px-6 mt-6 shadow-md text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5" /> {t.mainBadge}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-500">
                        {t.mainTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-amber-200 max-w-2xl mx-auto leading-relaxed">
                        {t.mainSubtitle}
                    </p>
                </header>
            </div>

            <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-20">

                <section>
                    <div className="flex justify-between items-end mb-8 border-b border-stone-200 dark:border-amber-500/20 pb-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#7c1d1d] dark:text-amber-100 font-serif">
                                {t.ourGalleryTitle}
                            </h2>
                            <p className="text-sm text-stone-600 dark:text-cream-200/80 mt-1">{t.ourGallerySubtitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {galleryPhotos.map((photo, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-md bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 aspect-video sm:aspect-square"
                            >
                                <img
                                    src={photo}
                                    alt={`Gallery item ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white text-sm font-medium flex items-center gap-1.5">
                                        <Images className="w-4 h-4 text-amber-400" /> {t.galleryImageView}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-amber-50/50 dark:bg-[#1a0408]/60 rounded-3xl p-6 sm:p-10 border border-amber-200/60 dark:border-amber-500/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#7c1d1d] dark:text-amber-100 font-serif">
                                {t.albumsTitle}
                            </h2>
                            <p className="text-sm text-stone-600 dark:text-cream-200/80 mt-1">{t.albumsSubtitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevAlbum}
                                className="p-3 rounded-full bg-white dark:bg-maroon-900 shadow-sm border border-stone-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-900 transition text-stone-700 dark:text-amber-300 cursor-pointer"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextAlbum}
                                className="p-3 rounded-full bg-white dark:bg-maroon-900 shadow-sm border border-stone-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-900 transition text-stone-700 dark:text-amber-300 cursor-pointer"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                        {albums.slice(currentAlbumSlide, currentAlbumSlide + 3).map((album) => (
                            <div
                                key={album.id}
                                className="group relative bg-white dark:bg-[#23060b] rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-amber-500/30 flex flex-col hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={album.cover}
                                        alt={lang === 'bn' ? album.titleBn : album.titleEn}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border border-amber-500/30">
                                        <Images className="w-3.5 h-3.5" /> {album.photosCount} {t.photosLabel}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 font-serif line-clamp-1 group-hover:text-amber-600 transition-colors">
                                            {lang === 'bn' ? album.titleBn : album.titleEn}
                                        </h3>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-amber-500/15 flex items-center text-amber-600 dark:text-amber-400 text-sm font-semibold">
                                        {t.openAlbum} →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-8 border-b border-stone-200 dark:border-amber-500/20 pb-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#7c1d1d] dark:text-amber-100 font-serif">
                                {t.videoTitle}
                            </h2>
                            <p className="text-sm text-stone-600 dark:text-cream-200/80 mt-1">{t.videoSubtitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="group relative bg-white dark:bg-[#1a0408] rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-amber-500/30 hover:shadow-xl transition-all"
                            >
                                <div className="relative aspect-video overflow-hidden bg-black">
                                    <img
                                        src={video.thumbnail}
                                        alt={lang === 'bn' ? video.titleBn : video.titleEn}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                                            <Play className="w-6 h-6 fill-white ml-0.5" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-amber-300 text-xs px-2 py-1 rounded border border-amber-500/20">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 font-serif">
                                        {lang === 'bn' ? video.titleBn : video.titleEn}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}