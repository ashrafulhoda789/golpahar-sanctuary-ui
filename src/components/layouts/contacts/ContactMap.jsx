import { MapPin, ExternalLink } from 'lucide-react';

export default function ContactMap({ t }) {
    
    const mapEmbedUrl = "https://maps.google.com/maps?q=Golpahar%20Mohashoshan%20Kali%20Mandir,%20O.R.%20Nizam%20Road,%20Chattogram&t=&z=16&ie=UTF8&iwloc=&output=embed";
    const googleMapsDirectLink = "https://www.google.com/maps/search/?api=1&query=Golpahar+Mohashoshan+Kali+Mandir,+O.R.+Nizam+Road,+Chattogram";

    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                        <MapPin className="w-3.5 h-3.5" /> Location
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                        {t.mapTitle}
                    </h3>
                </div>

                <a
                    href={googleMapsDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all cursor-pointer"
                >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>

            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone-200 dark:border-amber-500/30 bg-stone-100 dark:bg-[#23060b] shadow-inner">
                <iframe
                    title="Golpahar Mohashoshan Kali Mandir Location"
                    src={mapEmbedUrl}
                    className="w-full h-full border-0 dark:opacity-90 dark:contrast-110 transition-opacity"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}