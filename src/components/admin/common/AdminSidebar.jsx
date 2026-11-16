import { useNavigate, useLocation } from "react-router";
import {
    LayoutDashboard,
    FileText,
    Users,
    Calendar,
    MessageSquare,
    LogOut,
    X,
    HeartHandshake,
    Layers,
    BookOpen,
    DollarSign
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { authClient } from "../../../lib/auth-client";

export default function AdminSidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();

    const sidebarItems = [
        { name: t?.adminSidebar?.overview || "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
        // { name: t?.adminSidebar?.siteSettings || "Site Settings", path: "/admin/dashboard/settings", icon: Settings },
        { name: t?.adminSidebar?.pageContent || "Page Content", path: "/admin/dashboard/content", icon: BookOpen },
        { name: t?.adminSidebar?.pujaManagement || "Puja Management", path: "/admin/dashboard/pujas", icon: HeartHandshake },
        { name: t?.adminSidebar?.noticesEvents || "Notices & Events", path: "/admin/dashboard/notices", icon: FileText },
        { name: t?.adminSidebar?.gallery || "Gallery", path: "/admin/dashboard/gallery", icon: Layers },
        { name: t?.adminSidebar?.bookingsPayments || "Bookings & Payments", path: "/admin/dashboard/bookings", icon: Calendar },
        { name: t?.adminSidebar?.committee || "Committee", path: "/admin/dashboard/committee", icon: Users },
        { name: t?.adminSidebar?.registeredDevotees || "Donation", path: "/admin/dashboard/donation", icon: DollarSign },
        { name: t?.adminSidebar?.contactMessages || "Contact Messages", path: "/admin/dashboard/messages", icon: MessageSquare },
    ];

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            navigate('/admin/sign-in');
        } catch (err) {
            console.error("Sign out failed", err);
        }
    };

    return (
        <>
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm transition-opacity"
                />
            )}

            <aside
                className={`fixed xl:sticky top-0 left-0 z-50 h-screen w-72 bg-maroon-900 text-white flex flex-col justify-between p-6 shadow-2xl shrink-0 transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
                }`}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-stone-900 font-extrabold text-xl shadow-md select-none">
                                ॐ
                            </div>
                            <div>
                                <h2 className="font-heading font-bold text-base tracking-wide leading-tight">
                                    {t?.adminNav?.dashboard || 'Admin Portal'}
                                </h2>
                                <p className="text-[11px] text-amber-200/80">Golpahar Management</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="xl:hidden text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-1.5 font-sans overflow-y-auto pr-1 no-scrollbar my-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-white/15 text-white font-semibold shadow-inner border border-white/10"
                                            : "text-stone-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-stone-400"}`} />
                                    <span className="truncate">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="pt-4 border-t border-white/10 shrink-0 mt-auto">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-red-950/50 hover:bg-red-900/80 text-red-200 transition-all border border-red-500/20 shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>{t?.adminSidebar?.signOut || 'Sign Out'}</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}