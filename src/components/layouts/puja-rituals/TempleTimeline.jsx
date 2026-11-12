export default function TempleTimeline({ timelineItems = [] }) {
    return (
        <div className="relative max-w-4xl mx-auto py-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-amber-500/40 rounded-full hidden md:block" />

            <div className="space-y-8 md:space-y-12 relative">
                {timelineItems.map((item, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                        <div key={idx} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-6 md:gap-10`}>

                            {/* Content Box */}
                            <div className="w-full md:w-1/2">
                                <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 p-6 rounded-3xl shadow-sm hover:border-amber-500 transition-all space-y-2 relative">
                                    <span className="inline-block px-3 py-1 text-[11px] font-bold rounded-lg bg-amber-600 text-white shadow-2xs">
                                        {item.time}
                                    </span>
                                    <h4 className="text-lg font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/75 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Center Timeline Node Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-[#fdfbf7] dark:border-[#23060b] shadow-md hidden md:block" />

                            {/* Empty Space for Grid Balance */}
                            <div className="hidden md:block md:w-1/2" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}