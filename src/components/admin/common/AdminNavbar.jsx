import { Menu, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageToggle from "../../common/LanguageToggle";
import ThemeToggle from "../../common/ThemeToggle";


export default function AdminNavbar({ onOpenSidebar }) {
    const { t } = useLanguage();

    return (
        <header className="bg-white dark:bg-[#1f0508] border-b border-stone-200 dark:border-amber-500/20 px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs z-30 transition-colors duration-200">
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    onClick={onOpenSidebar}
                    className="xl:hidden p-2 text-[#5c060c] dark:text-amber-200 hover:text-stone-900 dark:hover:text-white rounded-xl bg-stone-100 dark:bg-maroon-900/60 hover:bg-stone-200 transition"
                    title="Open Menu"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#5c060c] dark:text-amber-400 hidden sm:block" />
                    <h1 className="text-sm sm:text-base lg:text-lg font-heading font-bold text-stone-800 dark:text-amber-100 uppercase tracking-wide truncate">
                        {t?.adminNav?.dashboard || 'Dashboard'}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">

                <LanguageToggle />

                <ThemeToggle />

                <div className="flex items-center gap-3 pl-3 border-l border-stone-200 dark:border-amber-500/20">
                    <div className="w-9 h-9 rounded-xl bg-[#5c060c] dark:bg-amber-400 text-amber-300 dark:text-stone-950 font-bold flex items-center justify-center text-xs shadow-md">
                        SA
                    </div>
                    <div className="text-left hidden sm:block">
                        <div className="text-xs font-bold text-stone-900 dark:text-amber-100 leading-tight">
                            {t?.adminNav?.superAdmin || 'Super Admin'}
                        </div>
                        <div className="text-[10px] text-stone-500 dark:text-amber-200/60">
                            {t?.adminNav?.access || 'Full System Access'}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}