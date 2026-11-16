import { useNavigate as useReactNavigate } from "react-router";
import { useLanguage } from "../../context/LanguageContext";
import {
    Calendar,
    HeartHandshake,
    FileText,
    CheckCircle2,
    Clock,
    ArrowRight,
    DollarSign,
    Plus
} from "lucide-react";

export default function DashboardOverview() {
    const navigate = useReactNavigate();
    const { t } = useLanguage();

    const quickPageCategoryButtons = [
        // { name: t?.adminSidebar?.siteSettings || "Site Settings", path: "/admin/dashboard/settings" },
        
        { name: t?.adminSidebar?.pageContent || "Page Content", path: "/admin/dashboard/content"},
        { name: t?.adminSidebar?.pujaManagement || "Puja Management", path: "/admin/dashboard/pujas"},
        { name: t?.adminSidebar?.bookingsPayments || "Bookings & Payments", path: "/admin/dashboard/bookings" },
        { name: t?.adminSidebar?.noticesEvents || "Notices & Events", path: "/admin/dashboard/notices"},
        { name: t?.adminSidebar?.gallery || "Gallery", path: "/admin/dashboard/gallery"},
        { name: t?.adminSidebar?.committee || "Committee", path: "/admin/dashboard/committee" },
        { name: t?.adminSidebar?.registeredDevotees || "Donation", path: "/admin/dashboard/donations" },
        { name: t?.adminSidebar?.contactMessages || "Contact Messages", path: "/admin/dashboard/messages" },
    ];

    const mockDonations = [
        { id: 1, name: "Subhash Roy", address: "Gachitola, Chattogram", email: "subhash@gmail.com", phone: "+880 1812-345678", amount: "৳ 5,000" },
        { id: 2, name: "Anita Das", address: "Jamalkhan, Chattogram", email: "anita.das@yahoo.com", phone: "+880 1711-987654", amount: "৳ 2,500" },
        { id: 3, name: "Prabal Sen", address: "Agrabad, Chattogram", email: "sen.prabal@outlook.com", phone: "+880 1680-112233", amount: "৳ 10,000" },
        { id: 4, name: "Rajesh Chowdhury", address: "Chawkbazar, Chattogram", email: "rajesh.c@gmail.com", phone: "+880 1914-556677", amount: "৳ 1,000" },
    ];

    const mockPujaBookings = [
        { id: "PB-101", name: "Joyanta Biswas", address: "Halishahar, Chattogram", email: "joyanta.b@gmail.com", phone: "+880 1819-001122", status: "Paid", statusType: "success" },
        { id: "PB-102", name: "Priyanka Dey", address: "Panchlaish, Chattogram", email: "priyanka.dey@gmail.com", phone: "+880 1715-334455", status: "Pending", statusType: "warning" },
        { id: "PB-103", name: "Biplab Sharma", address: "Anderkilla, Chattogram", email: "biplab.s@yahoo.com", phone: "+880 1672-889900", status: "Paid", statusType: "success" },
        { id: "PB-104", name: "Kakali Das", address: "Nasirabad, Chattogram", email: "kakali.das@hotmail.com", phone: "+880 1912-776655", status: "Failed", statusType: "danger" },
    ];

    return (
        <div className="space-y-8 font-sans">

            <div className="bg-white dark:bg-[#2e040a] p-5 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition-colors">
                <div className="shrink-0 border-b xl:border-b-0 xl:border-r border-stone-200 dark:border-amber-500/20 pb-3 xl:pb-0 xl:pr-6">
                    <h1 className="text-xl font-heading font-bold text-amber-600 tracking-tight">
                        {t?.adminDashboard?.overview || "Overview"}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-amber-200/70">
                        {t?.adminDashboard?.subTitle || "Temple operations summary"}
                    </p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar scroll-smooth py-1 px-1">
                    {quickPageCategoryButtons.map((btn, idx) => {
                        
                        return (
                            <button
                                key={idx}
                                onClick={() => navigate(btn.path)}
                                className="flex items-center gap-2 px-3.5 py-2 bg-stone-50 dark:bg-[#400d14] hover:bg-[#5c060c] dark:hover:bg-amber-400 hover:text-white dark:hover:text-[#23060b] text-stone-700 dark:text-cream-100 text-[11px] font-semibold rounded-xl border border-stone-200 dark:border-amber-500/20 hover:border-[#5c060c] dark:hover:border-amber-400 transition-all shrink-0 shadow-2xs group"
                            >
                                <Plus className="w-3.5 h-3.5 text-stone-500 dark:text-amber-400 group-hover:text-amber-300 dark:group-hover:text-[#23060b] transition-colors" />
                                <span>{btn.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
 
                <div className="bg-white dark:bg-[#2e040a] p-6 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-stone-400 dark:text-amber-200/60 uppercase tracking-wider">
                                {t?.adminDashboard?.totalDonations || "Total Donations"}
                            </p>
                            <h3 className="text-2xl font-black text-stone-800 dark:text-amber-100 mt-2">৳ 1,85,400</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <span> +৳ 18,500 {t?.adminDashboard?.todayDonationSub || "collected today"}</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#2e040a] p-6 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-stone-400 dark:text-amber-200/60 uppercase tracking-wider">
                                {t?.adminDashboard?.totalBookings || "Total Bookings"}
                            </p>
                            <h3 className="text-2xl font-black text-stone-800 dark:text-amber-100 mt-2">148</h3>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 rounded-xl">
                            <Calendar className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-stone-500 dark:text-amber-200/70 font-medium">
                        {t?.adminDashboard?.todayBookingSub || "12 bookings scheduled today"}
                    </div>
                </div>

                <div className="bg-white dark:bg-[#2e040a] p-6 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-stone-400 dark:text-amber-200/60 uppercase tracking-wider">
                                {t?.adminDashboard?.activePuja || "Active Puja"}
                            </p>
                            <h3 className="text-2xl font-black text-stone-800 dark:text-amber-100 mt-2">8</h3>
                        </div>
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/70 text-[#5c060c] dark:text-rose-400 rounded-xl">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-stone-500 dark:text-amber-200/70 font-medium">
                        {t?.adminDashboard?.activePujaSub || "All services open for online booking"}
                    </div>
                </div>

                <div className="bg-white dark:bg-[#2e040a] p-6 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-stone-400 dark:text-amber-200/60 uppercase tracking-wider">
                                {t?.adminDashboard?.publishedNotice || "Published Notice"}
                            </p>
                            <h3 className="text-2xl font-black text-stone-800 dark:text-amber-100 mt-2">24</h3>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 rounded-xl">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-stone-500 dark:text-amber-200/70 font-medium">
                        {t?.adminDashboard?.latestNoticeSub || "Latest: Shyama Puja Schedule"}
                    </div>
                </div>

            </div>

            <div className="bg-white dark:bg-[#2e040a] rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm overflow-hidden transition-colors">
                <div className="p-6 border-b border-stone-200 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-heading font-bold text-stone-800 dark:text-amber-100">
                            {t?.adminDashboard?.todaysDonationTitle || "Today's Donation List"}
                        </h2>
                        <p className="text-xs text-stone-500 dark:text-amber-200/70 mt-0.5">
                            {t?.adminDashboard?.todaysDonationSub || "Recent devotees donation contributions"}
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/dashboard/bookings")}
                        className="text-xs font-bold text-[#5c060c] dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                    >
                        <span>{t?.adminDashboard?.viewAllDonations || "View All Donations"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-stone-50 dark:bg-[#400d14] text-stone-500 dark:text-amber-200/80 text-[11px] font-bold uppercase tracking-wider border-b border-stone-200 dark:border-amber-500/20">
                                <th className="py-3.5 px-6">{t?.adminDashboard?.devoteeName || "Devotee Name"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.address || "Address"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.email || "Email"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.phone || "Phone"}</th>
                                <th className="py-3.5 px-6 text-right">{t?.adminDashboard?.amount || "Amount"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs text-stone-700 dark:text-cream-100">
                            {mockDonations.map((row) => (
                                <tr key={row.id} className="hover:bg-stone-50/80 dark:hover:bg-[#400d14]/60 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-stone-900 dark:text-amber-100">{row.name}</td>
                                    <td className="py-4 px-6 text-stone-600 dark:text-cream-200/80">{row.address}</td>
                                    <td className="py-4 px-6 text-stone-600 dark:text-cream-200/80">{row.email}</td>
                                    <td className="py-4 px-6 font-mono text-stone-600 dark:text-cream-200/80">{row.phone}</td>
                                    <td className="py-4 px-6 text-right font-bold text-emerald-600 dark:text-emerald-400">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-[#2e040a] rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm overflow-hidden transition-colors">
                <div className="p-6 border-b border-stone-200 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-heading font-bold text-stone-800 dark:text-amber-100">
                            {t?.adminDashboard?.bookedPujaTitle || "Booked Puja List"}
                        </h2>
                        <p className="text-xs text-stone-500 dark:text-amber-200/70 mt-0.5">
                            {t?.adminDashboard?.bookedPujaSub || "Recent puja booking registrations"}
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/dashboard/bookings")}
                        className="text-xs font-bold text-[#5c060c] dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                    >
                        <span>{t?.adminDashboard?.manageBookings || "Manage All Bookings"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-stone-50 dark:bg-[#400d14] text-stone-500 dark:text-amber-200/80 text-[11px] font-bold uppercase tracking-wider border-b border-stone-200 dark:border-amber-500/20">
                                <th className="py-3.5 px-6">{t?.adminDashboard?.devoteeName || "Devotee Name"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.address || "Address"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.email || "Email"}</th>
                                <th className="py-3.5 px-6">{t?.adminDashboard?.phone || "Phone"}</th>
                                <th className="py-3.5 px-6 text-center">{t?.adminDashboard?.paymentStatus || "Payment Status"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs text-stone-700 dark:text-cream-100">
                            {mockPujaBookings.map((row) => (
                                <tr key={row.id} className="hover:bg-stone-50/80 dark:hover:bg-[#400d14]/60 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-stone-900 dark:text-amber-100">{row.name}</td>
                                    <td className="py-4 px-6 text-stone-600 dark:text-cream-200/80">{row.address}</td>
                                    <td className="py-4 px-6 text-stone-600 dark:text-cream-200/80">{row.email}</td>
                                    <td className="py-4 px-6 font-mono text-stone-600 dark:text-cream-200/80">{row.phone}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                            row.statusType === "success" 
                                                ? "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30"
                                                : row.statusType === "warning"
                                                ? "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                                                : "bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30"
                                        }`}>
                                            {row.statusType === "success" && <CheckCircle2 className="w-3 h-3" />}
                                            {row.statusType === "warning" && <Clock className="w-3 h-3" />}
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}