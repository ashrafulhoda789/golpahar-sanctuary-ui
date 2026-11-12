export default function WhoWeAreSection({ t, aboutData, heroImage, lang }) {
    
    const introText = (lang === 'bn' ? aboutData?.introduction_bn : aboutData?.introduction_en)
        || aboutData?.introduction
        || t.introFallback;

    const secondParaText = (lang === 'bn' ? aboutData?.secondPara_bn : aboutData?.secondPara_en)
        || t.secondParaFallback;

    const imageUrl = aboutData?.image || heroImage || "https://i.ibb.co.com/tw9CgxkX/temple1.jpg";

    return (
        <section className="py-12 px-2 md:py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                        <div className="p-2.5 rounded-t-full border-2 border-amber-500/60 dark:border-amber-400/50 bg-amber-50/40 dark:bg-[#1a0408] shadow-xl">
                            <div className="overflow-hidden rounded-t-full aspect-[3/4] bg-amber-600/20">
                                <img
                                    src={imageUrl}
                                    alt="Golpahar Mohashoshan Kali Mandir"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white shadow-sm">
                        {t.whoWeAreBadge}
                    </span>

                    <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#7c1d1d] dark:text-amber-200 leading-tight">
                        {t.whoWeAreTitle}
                    </h2>

                    <p className="text-sm sm:text-base text-stone-700 dark:text-cream-100/85 leading-relaxed">
                        {introText}
                    </p>

                    <p className="text-sm sm:text-base text-stone-600 dark:text-cream-200/75 leading-relaxed">
                        {secondParaText}
                    </p>

                    <div className="pt-2">
                        <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-xs sm:text-sm font-semibold text-stone-800 dark:text-amber-300 italic">
                            {t.guidingLine}
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}