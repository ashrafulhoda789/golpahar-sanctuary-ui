import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import kali from '../../assets/gallery/kali.jfif';

const DivinePresence = () => {
    return (
        <section className="relative bg-cream-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                <div className="p-6 sm:p-10 ">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        <div className="lg:col-span-5 relative group overflow-hidden rounded-xl shadow-md border-2 border-amber-500/40 h-[320px] sm:h-[400px]">
                            <img
                                src={kali}
                                alt="Divine Mother Shyama"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/20 to-transparent flex items-end p-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-maroon-950 text-xs font-bold">
                                    <Sparkles className="w-3.5 h-3.5" /> Divine Grace
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-300 text-maroon-900 text-xs font-semibold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                <span>Our Adored Deity</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-maroon-900 leading-tight">
                                Devotion, Reverence, and Prayer at the Feet of Maa Shyama
                            </h2>

                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Maa Kali is the eternal symbol of divine energy, courage, and benevolence. In Her worship, devotees seek inner peace, the destruction of evil forces, and the inspiration to overcome life's obstacles.
                            </p>

                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                The worship of Maa Shyama is deeply intertwined with the spiritual heritage and consciousness of Golpahar Mohashoshan. Across generations, this sacred tradition has been sustained through deep devotion, faith, and religious harmony.
                            </p>

                            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <Link to="/" className="btn-primary">
                                    <span className='font-bold'>Explore Our Temple</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default DivinePresence;