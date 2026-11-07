import { Sparkles } from 'lucide-react';

import img1 from '../../assets/luminaries/rani-rashmoti.webp';
import img2 from '../../assets/luminaries/Ramakrishna_Paramhansa.webp';
import img3 from '../../assets/luminaries/saradadevi.jfif';
import img4 from '../../assets/luminaries/swamivivek.jpg';

const luminariesData = [
    {
        id: 1,
        name: "Lokamata Rani Rashmoni",
        role: "Philanthropist & Founder",
        period: "1793–1861",
        desc: "Pioneered devout philanthropy, establishing iconic sacred spaces and serving society with unwavering devotion.",
        image: img1
    },
    {
        id: 2,
        name: "Sri Ramakrishna Paramhansa",
        role: "Spiritual Master",
        period: "1836–1886",
        desc: "Embodied divine harmony, teaching universal truth and inspiring millions through profound devotion to Maa Kali.",
        image: img2
    },
    {
        id: 3,
        name: "Sri Sri Ma Sarada Devi",
        role: "Holy Mother",
        period: "1853–1920",
        desc: "Symbolized infinite compassion and maternal grace, guiding spiritual seekers with love and wisdom.",
        image: img3
    },
    {
        id: 4,
        name: "Swami Vivekananda",
        role: "Philosopher & Reformer",
        period: "1863–1902",
        desc: "Carried the eternal message of Vedanta to the world, inspiring selfless service and spiritual awakening.",
        image: img4
    }
];

const Luminaries = () => {
    return (
        <section className="relative bg-cream-100 py-20 px-4 sm:px-6 lg:px-8 border-b border-cream-300">
            <div className="max-w-350 mx-auto w-full">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-amber-500/30">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-maroon-900 uppercase tracking-widest">
                            Sacred Legacy
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-maroon-900">
                        Honored Luminaries
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        The revered personalities whose lives, devotion, and spiritual vision continue to illuminate our sacred heritage.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {luminariesData.map((person) => (
                        <div
                            key={person.id}
                            className="bg-[#f3deb1] p-6 shadow-md hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-t-full border-2 border-amber-500/60 p-2 pb-0 bg-maroon-900 overflow-hidden mb-5 shadow-inner">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover rounded-t-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="space-y-1.5 w-full">
                                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                                    {person.role}
                                </span>
                                <h3 className="font-heading font-bold text-maroon-900 text-lg sm:text-xl leading-snug">
                                    {person.name}
                                </h3>
                                <p className="text-xs font-semibold text-gray-600 pb-2 border-b border-cream-300">
                                    {person.period}
                                </p>
                                <p className="text-xs text-gray-700 leading-relaxed pt-1">
                                    {person.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Luminaries;