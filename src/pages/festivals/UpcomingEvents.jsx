import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import { Sparkles } from "lucide-react";
import UpcomingEventCard from "../../components/layouts/events/UpcomingEventCard";
import { getAllEvents } from "../../lib/api/events";

export default function UpcomingEventsPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.upcomingEventsPage || translations?.en?.upcomingEventsPage || {
        breadcrumbHome: "Home",
        breadcrumbUpcoming: "Upcoming Events",
        mainBadge: "DIVINE CELEBRATIONS",
        mainTitle: "Upcoming Temple Event",
        mainSubtitle: "Explore the upcoming major temple celebration and its day-wise schedules.",
        loading: "Loading upcoming festival details...",
        error: "Failed to load events data.",
        noEvents: "No upcoming events found at the moment."
    };

    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchUpcomingFestival = async () => {
            setLoading(true);
            try {
                const response = await getAllEvents();
                if (response && response.success && Array.isArray(response.data)) {
                    const now = new Date().getTime();

                    const upcomingList = response.data
                        .filter(ev => new Date(ev.eventDateTime || ev.event_date_time).getTime() >= now)
                        .sort((a, b) => new Date(a.eventDateTime || a.event_date_time) - new Date(b.eventDateTime || b.event_date_time));

                    if (upcomingList.length > 0) {
                        setUpcomingEvent(upcomingList[0]);
                    } else if (response.data.length > 0) {
                        setUpcomingEvent(response.data[0]);
                    }
                } else {
                    setErrorMsg(t.error);
                }
            } catch (err) {
                console.error("Error fetching upcoming events:", err);
                setErrorMsg(t.error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingFestival();
    }, [lang, t.error]);

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className="bg-maroon-900">
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4 ">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbUpcoming}
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {loading ? (
                    <div className="text-center py-16 text-stone-400 text-xs font-medium">
                        {t.loading}
                    </div>
                ) : errorMsg ? (
                    <div className="text-center py-12 bg-white dark:bg-[#1a0408] border border-red-500/20 rounded-3xl p-6 text-red-500 text-xs">
                        {errorMsg}
                    </div>
                ) : upcomingEvent ? (
                    <UpcomingEventCard event={upcomingEvent} lang={lang} />
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 text-stone-500 dark:text-cream-200/70 text-xs">
                        {t.noEvents}
                    </div>
                )}
            </main>
        </div>
    );
}