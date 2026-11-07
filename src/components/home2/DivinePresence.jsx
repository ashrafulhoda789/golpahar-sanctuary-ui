import { ArrowRight, Sparkles, Shield, Flame, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router';
import kali from '../../assets/gallery/kali.jfif';

const DivinePresence = () => {
    return (
        <section className="relative bg-cream-200 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-md h-[440px] sm:h-[500px] rounded-t-full border-2 border-amber-500/60 p-3 pb-0 bg-maroon-900 shadow-2xl overflow-hidden group">

                            <img
                                src={kali}
                                alt="Maa Shyama Deity"
                                className="w-full h-full object-cover rounded-t-full group-hover:scale-105 transition-transform duration-700 opacity-95"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent flex items-end justify-center pb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-maroon-950 font-heading font-bold text-xs shadow-lg">
                                    <Sparkles className="w-3.5 h-3.5" /> Divine Grace of Maa Shyama
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-amber-500/30">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-semibold text-maroon-900 uppercase tracking-widest">
                                OUR ADORED DEITY
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-maroon-900 leading-tight">
                            Devotion, Reverence, and Prayer at the Feet of Maa Shyama
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            Maa Kali is the eternal symbol of divine energy, courage, and benevolence. In Her worship, devotees seek inner peace, the destruction of evil forces, and the inspiration to overcome life's obstacles.
                        </p>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            The worship of Maa Shyama is deeply intertwined with the spiritual heritage and consciousness of Golpahar Mohashoshan. Across generations, this sacred tradition has been sustained through deep devotion, faith, and religious harmony.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div className="bg-[#f3deb1] p-3.5 text-center">
                                <Shield className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                                <h4 className="font-heading font-bold text-maroon-900 text-xs uppercase">Protection</h4>
                                <p className="text-[11px] text-gray-600 mt-0.5">Destroys negative energies</p>
                            </div>

                            <div className="bg-[#f3deb1] p-3.5 text-center">
                                <Flame className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                                <h4 className="font-heading font-bold text-maroon-900 text-xs uppercase">Courage</h4>
                                <p className="text-[11px] text-gray-600 mt-0.5">Empowers spiritual strength</p>
                            </div>

                            <div className="bg-[#f3deb1] p-3.5 text-center">
                                <HeartHandshake className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                                <h4 className="font-heading font-bold text-maroon-900 text-xs uppercase">Benevolence</h4>
                                <p className="text-[11px] text-gray-600 mt-0.5">Bestows peace & blessings</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-maroon-900 text-amber-200 font-heading font-bold text-sm hover:bg-maroon-950 transition-all shadow-lg group"
                            >
                                <span>Explore Our Temple Heritage</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default DivinePresence;