import { Clock, Sparkles, Bell, Sun, Moon, Flame } from 'lucide-react';
import arthi from '../../assets/banner/arthi.jfif';

const scheduleItems = [
    {
        id: 1,
        time: "06:30 AM",
        title: "Mangal Aarti",
        desc: "The auspicious morning awakening ritual of Maa Kali with conch shells and lamps.",
        icon: Sun,
        badge: "Morning"
    },
    {
        id: 2,
        time: "08:00 AM",
        title: "Morning Puja & Bhog",
        desc: "Daily ritualistic worship, sacred mantra chanting, and offering of morning bhog.",
        icon: Bell,
        badge: "Ritual"
    },
    {
        id: 3,
        time: "12:30 PM",
        title: "Madhyanha Aarti & Temple Closure",
        desc: "Midday prayer before the afternoon break for temple sanctity.",
        icon: Clock,
        badge: "Midday"
    },
    {
        id: 4,
        time: "03:30 PM",
        title: "Temple Reopening",
        desc: "Sanctuary doors reopen for afternoon visitors and individual prayers.",
        icon: Sparkles,
        badge: "Afternoon"
    },
    {
        id: 5,
        time: "06:30 PM",
        title: "Sandhya Aarti",
        desc: "The grand evening worship filled with incense, deepams, and devotional chants.",
        icon: Flame,
        badge: "Evening"
    },
    {
        id: 6,
        time: "07:30 PM",
        title: "Shayan Aarti & Temple Closure",
        desc: "Final resting prayer of the day before closing the sanctum doors.",
        icon: Moon,
        badge: "Night"
    },
];

const ArthiSchedule = () => {
    return (
        <section className="relative bg-cream-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-amber-500/30">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-maroon-900 uppercase tracking-widest">
                            Divine Timings
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-maroon-900">
                        Daily Aarti & Ritual Schedule
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                        Plan your visit and participate in the sacred daily rituals at Golpahar Mohashoshan Kali Mandir.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-4 bg-maroon-900 text-amber-100 p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">

                        <div className="relative w-full max-w-xs h-[380px] rounded-t-full border-2 border-amber-500/60 p-3 pb-0 flex flex-col items-center justify-center bg-maroon-950/50 shadow-inner overflow-hidden mb-6">
                            <img
                                src={arthi}
                                alt="Mandir Ritual"
                                className="w-full h-full object-cover rounded-t-full opacity-90 hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent flex items-end justify-center pb-6">
                                <span className="text-xs font-semibold text-amber-200 px-3 py-1 rounded-full bg-maroon-900/90 border border-amber-500/40">
                                    Sacred Sanctum
                                </span>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="font-heading font-bold text-amber-200 text-lg">
                                Open All Days
                            </h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Morning: 6:30 AM - 12:30 PM <br />
                                Evening: 3:30 PM - 7:30 PM
                            </p>
                        </div>

                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {scheduleItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="bg-[#f3deb1] p-5 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-900 text-amber-200 text-xs font-semibold">
                                                <IconComponent className="w-3.5 h-3.5 text-amber-400" />
                                                {item.badge}
                                            </span>
                                            <span className="text-xs font-heading font-bold text-maroon-900 bg-cream-300 px-2.5 py-1 rounded-lg">
                                                {item.time}
                                            </span>
                                        </div>

                                        <h4 className="font-heading font-bold text-maroon-900 text-lg mb-1 group-hover:text-amber-700 transition-colors">
                                            {item.title}
                                        </h4>

                                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-cream-300/60 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                                        <span>Golpahar Mandir, Chittagong</span>
                                        <span className="text-maroon-900 font-semibold">All Devotees Welcome</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ArthiSchedule;