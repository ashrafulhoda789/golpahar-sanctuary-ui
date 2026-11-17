/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import {
  ImageIcon,
  Clock,
  Calendar,
  BookOpen,
  Layers,
  Users,
  Save,
  Loader2,
} from "lucide-react";
import BannerForm from "../../components/admin/page-content/BannerForm";
import TempleTimeForm from "../../components/admin/page-content/TempleTimeForm";
import ArthiScheduleForm from "../../components/admin/page-content/ArthiScheduleForm";
import AboutForm from "../../components/admin/page-content/AboutForm";
import { useLanguage } from "../../context/LanguageContext";
import { fetchSiteSettings } from "../../lib/api/contents";
import { updateSiteSettings } from "../../lib/actions/contents";
import HistoryForm from "../../components/admin/page-content/HistoryForm";
import DeitiesForm from "../../components/admin/page-content/DeitiesForm";

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
    deities: [],
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
      setMessage({
        type: "success",
        text: t?.adminSettings?.successMsg || "Settings saved successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: t?.adminSettings?.errorMsg || "Failed to save settings!",
      });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    {
      id: "banner",
      label: t?.adminSettings?.tabs?.banner || "Banner",
      icon: ImageIcon,
    },
    {
      id: "timing",
      label: t?.adminSettings?.tabs?.timing || "Temple Time",
      icon: Clock,
    },
    {
      id: "arthi",
      label: t?.adminSettings?.tabs?.arthi || "Arthi Schedule",
      icon: Calendar,
    },
    {
      id: "about",
      label: t?.adminSettings?.tabs?.about || "About Us",
      icon: BookOpen,
    },
    {
      id: "history",
      label: t?.adminSettings?.tabs?.history || "History",
      icon: Layers,
    },
    {
      id: "deities",
      label: t?.adminSettings?.tabs?.deities || "Deities",
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
            {t?.adminSettings?.title || "Site Settings"}
          </h1>
          <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
            {t?.adminSettings?.subtitle ||
              "Manage core website content and information"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>
            {saving
              ? t?.adminSettings?.saving || "Saving..."
              : t?.adminSettings?.saveChanges || "Save Changes"}
          </span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold border ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-600"}`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-2 rounded-2xl shadow-sm overflow-x-auto flex items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-stone-50 dark:bg-[#23060b] text-stone-600 dark:text-cream-200 hover:bg-amber-50/40 dark:hover:bg-amber-950/20"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-white" : "text-amber-600 dark:text-amber-400"}`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 sm:p-8 rounded-3xl shadow-sm">
        {activeTab === "banner" && (
          <BannerForm
            data={settings.hero}
            onChange={(updated) => setSettings({ ...settings, hero: updated })}
          />
        )}
        {activeTab === "timing" && (
          <TempleTimeForm
            data={settings.templeTimings}
            onChange={(updated) =>
              setSettings({ ...settings, templeTimings: updated })
            }
          />
        )}
        {activeTab === "arthi" && (
          <ArthiScheduleForm
            data={settings.arthiSchedule}
            onChange={(updated) =>
              setSettings({ ...settings, arthiSchedule: updated })
            }
          />
        )}
        {activeTab === "about" && (
          <AboutForm
            data={settings.about}
            onSave={handleSave}
            saving={saving}
            onChange={(updated) => setSettings({ ...settings, about: updated })}
          />
        )}
        {activeTab === "history" && (
          <HistoryForm
            data={settings.history}
            onSave={handleSave}
            saving={saving}
            onChange={(updated) =>
              setSettings({ ...settings, history: updated })
            }
          />
        )}
        {activeTab === "deities" && (
          <DeitiesForm
            data={settings.deities}
            onSave={handleSave}
            saving={saving}
            onChange={(updated) =>
              setSettings({ ...settings, deities: updated })
            }
          />
        )}
      </div>
    </div>
  );
}
