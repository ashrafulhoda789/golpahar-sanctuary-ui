export default function VisitorInfoSection({ t }) {
    return (
        <div className="w-full">
            <div className="bg-maroon-800 p-6 sm:p-8 shadow-lg border border-amber-500/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/30">
                    {t.features.map((feature, idx) => {
                        
                        const isBn = typeof feature === 'string' && /[ঀ-ৌ]/.test(feature); 

                        // eslint-disable-next-line no-useless-assignment
                        let label = "Visitor Info";
                        let value = feature;

                        if (typeof feature === 'object' && feature !== null) {
                            label = feature.label;
                            value = feature.value;
                        } else if (typeof feature === 'string' && feature.includes(':')) {
                            const parts = feature.split(':');
                            label = parts[0].trim();
                            value = parts.slice(1).join(':').trim();
                        } else {
                           
                            const defaultLabelsEn = ["Temple Entry", "Photography", "Shoe Keeping", "Daily Worship"];
                            const defaultLabelsBn = ["মন্দিরে প্রবেশ", "ছবি তোলা", "জুতা রাখা", "দৈনিক পূজা শুরু"];

                            label = isBn ? defaultLabelsBn[idx] || "তথ্য" : defaultLabelsEn[idx] || "Info";
                        }

                        return (
                            <div key={idx} className={`flex flex-col items-center text-center px-4 ${idx !== 0 ? 'pt-4 sm:pt-0' : ''}`}>
                                <span className="text-xs sm:text-sm font-medium text-amber-200/80 mb-1 tracking-wide">
                                    {label}
                                </span>
                                <span className="text-sm sm:text-base font-bold text-cream-100 tracking-wide">
                                    {value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}