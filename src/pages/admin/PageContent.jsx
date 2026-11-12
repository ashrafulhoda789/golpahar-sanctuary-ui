/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import { ImageIcon, Clock, Calendar, BookOpen, Layers, Users, Save, Loader2 } from "lucide-react";
import BannerForm from "../../components/admin/page-content/BannerForm";
import TempleTimeForm from "../../components/admin/page-content/TempleTimeForm";
import ArthiScheduleForm from "../../components/admin/page-content/ArthiScheduleForm";
import { useLanguage } from "../../context/LanguageContext";
import { fetchSiteSettings } from "../../lib/api/contents";
import { updateSiteSettings } from "../../lib/actions/contents";

export default function PageContent() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("banner");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const [settings, setSettings] = useState({
        hero: {},
        templeTimings: {},
        arthiSchedule: [],
        about: {},
        history: {},
        deities: []
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const data = await fetchSiteSettings();
            if (data) setSettings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage(null);
            await updateSiteSettings(settings);
            setMessage({ type: "success", text: t?.adminSettings?.successMsg || "Settings saved successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: t?.adminSettings?.errorMsg || "Failed to save settings!" });
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: "banner", label: t?.adminSettings?.tabs?.banner || "Banner", icon: ImageIcon },
        { id: "timing", label: t?.adminSettings?.tabs?.timing || "Temple Time", icon: Clock },
        { id: "arthi", label: t?.adminSettings?.tabs?.arthi || "Arthi Schedule", icon: Calendar },
        { id: "about", label: t?.adminSettings?.tabs?.about || "About Us", icon: BookOpen },
        { id: "history", label: t?.adminSettings?.tabs?.history || "History", icon: Layers },
        { id: "deities", label: t?.adminSettings?.tabs?.deities || "Deities", icon: Users },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-[#5c060c] dark:text-amber-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-350 mx-auto font-sans pb-12">

            <div className="bg-white dark:bg-[#1f0509] p-5 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
                <div>
                    <h1 className="text-xl font-heading font-bold text-stone-800 dark:text-amber-100">
                        {t?.adminSettings?.title || "Site Settings"}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-amber-200/70 mt-0.5">
                        {t?.adminSettings?.subtitle || "Manage core website content and information"}
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#5c060c] dark:bg-amber-400 hover:bg-[#420409] dark:hover:bg-amber-300 text-white dark:text-[#23060b] text-xs font-bold rounded-xl shadow transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{saving ? (t?.adminSettings?.saving || "Saving...") : (t?.adminSettings?.saveChanges || "Save Changes")}</span>
                </button>
            </div>

            {message && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white dark:bg-[#1f0509] p-2 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm overflow-x-auto custom-scrollbar flex items-center gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${isActive
                                    ? "bg-[#5c060c] dark:bg-amber-400 text-white dark:text-[#23060b] shadow"
                                    : "bg-stone-50 dark:bg-[#400d14] text-stone-700 dark:text-cream-100 hover:bg-stone-100 dark:hover:bg-[#4a1018]"
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? "text-amber-300 dark:text-[#23060b]" : "text-stone-500 dark:text-amber-400"}`} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="bg-white dark:bg-[#1f0509] p-6 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-sm transition-colors">
                {activeTab === "banner" && (
                    <BannerForm data={settings.hero} onChange={(updated) => setSettings({ ...settings, hero: updated })} />
                )}
                {activeTab === "timing" && (
                    <TempleTimeForm data={settings.templeTimings} onChange={(updated) => setSettings({ ...settings, templeTimings: updated })} />
                )}
                {activeTab === "arthi" && (
                    <ArthiScheduleForm data={settings.arthiSchedule} onChange={(updated) => setSettings({ ...settings, arthiSchedule: updated })} />
                )}
                {/* বাকি ফর্মগুলো এখানে যুক্ত হবে */}
            </div>

        </div>
    );
}