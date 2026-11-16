export default function WhoWeAreSection({ t, aboutData, lang }) {
    const pageTitle = (lang === 'bn'
        ? (aboutData?.pageTitle_bn || t.pageTitle)
        : (aboutData?.pageTitle_en || t.pageTitle)) || "About Us";

    const pageSubtitle = (lang === 'bn'
        ? (aboutData?.pageSubtitle_bn || t.pageSubtitle)
        : (aboutData?.pageSubtitle_en || t.pageSubtitle)) || "";

    const tagText = (lang === 'bn'
        ? (aboutData?.whoWeAreTag_bn || t.whoWeAreBadge)
        : (aboutData?.whoWeAreTag_en || t.whoWeAreBadge)) || "WHO WE ARE";

    const titleText = (lang === 'bn'
        ? (aboutData?.whoWeAreTitle_bn || t.whoWeAreTitle)
        : (aboutData?.whoWeAreTitle_en || t.whoWeAreTitle)) || "";

    const desc1 = (lang === 'bn'
        ? (aboutData?.whoWeAreDesc1_bn || t.introFallback)
        : (aboutData?.whoWeAreDesc1_en || t.introFallback)) || "";

    const desc2 = (lang === 'bn'
        ? (aboutData?.whoWeAreDesc2_bn || t.secondParaFallback)
        : (aboutData?.whoWeAreDesc2_en || t.secondParaFallback)) || "";

    const quote = (lang === 'bn'
        ? (aboutData?.quote_bn || t.guidingLine)
        : (aboutData?.quote_en || t.guidingLine)) || "";

    const imageUrl = aboutData?.imageUrl || "https://i.ibb.co.com/tw9CgxkX/temple1.jpg";

    return (
        <>
            <div className='bg-maroon-900'>
                <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-10 text-center space-y-2 border-b border-stone-200 dark:border-amber-500/20">
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-amber-500">
                        {pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-cream-200 max-w-2xl mx-auto">
                        {pageSubtitle}
                    </p>
                </header>
            </div>

            <section className="py-12 px-2 md:py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center px-4">

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
                            {tagText}
                        </span>

                        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#7c1d1d] dark:text-amber-200 leading-tight">
                            {titleText}
                        </h2>

                        {desc1 && (
                            <p className="text-sm sm:text-base text-stone-700 dark:text-cream-100/85 leading-relaxed">
                                {desc1}
                            </p>
                        )}

                        {desc2 && (
                            <p className="text-sm sm:text-base text-stone-600 dark:text-cream-200/75 leading-relaxed">
                                {desc2}
                            </p>
                        )}

                        {quote && (
                            <div className="pt-2">
                                <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-xs sm:text-sm font-semibold text-stone-800 dark:text-amber-300 italic">
                                    {quote}
                                </blockquote>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}