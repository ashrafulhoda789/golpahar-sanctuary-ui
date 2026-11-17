import { useState } from "react";
import { Sparkles, X } from "lucide-react";

const AVAILABLE_ICONS = [
  "Calendar",
  "Award",
  "Sparkles",
  "Flame",
  "Shield",
  "Star",
  "BookOpen",
  "Users",
  "Compass",
  "Clock",
  "Heart",
  "Sun",
];

export default function HistoryMilestoneModal({
  isOpen,
  onClose,
  onSaveMilestone,
  inputClass,
  labelClass,
}) {
  const [milestoneData, setMilestoneData] = useState({
    icon: "Calendar",
    badge_en: "",
    badge_bn: "",
    title_en: "",
    title_bn: "",
    description_en: "",
    description_bn: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveMilestone(milestoneData);
    setMilestoneData({
      icon: "Calendar",
      badge_en: "",
      badge_bn: "",
      title_en: "",
      title_bn: "",
      description_en: "",
      description_bn: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-amber-500/15">
          <h3 className="text-base font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> Add New Historical
            Milestone
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Select Icon</label>
            <select
              value={milestoneData.icon}
              onChange={(e) =>
                setMilestoneData({ ...milestoneData, icon: e.target.value })
              }
              className={inputClass}
            >
              {AVAILABLE_ICONS.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Badge / Tag (English)</label>
              <input
                type="text"
                value={milestoneData.badge_en}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    badge_en: e.target.value,
                  })
                }
                placeholder="e.g. 38th Edition"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Badge / Tag (বাংলা)</label>
              <input
                type="text"
                value={milestoneData.badge_bn}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    badge_bn: e.target.value,
                  })
                }
                placeholder="যেমন: ৩৮তম সংস্করণ"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Milestone Title (English) *</label>
              <input
                type="text"
                required
                value={milestoneData.title_en}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    title_en: e.target.value,
                  })
                }
                placeholder="e.g. JANUARY 2025 FESTIVAL"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Milestone Title (বাংলা) *</label>
              <input
                type="text"
                required
                value={milestoneData.title_bn}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    title_bn: e.target.value,
                  })
                }
                placeholder="যেমন: জানুয়ারি ২০২৫ উৎসব"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Description (English)</label>
              <textarea
                rows={3}
                value={milestoneData.description_en}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    description_en: e.target.value,
                  })
                }
                placeholder="Milestone description in English..."
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Description (বাংলা)</label>
              <textarea
                rows={3}
                value={milestoneData.description_bn}
                onChange={(e) =>
                  setMilestoneData({
                    ...milestoneData,
                    description_bn: e.target.value,
                  })
                }
                placeholder="বাংলায় বিবরণ..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-amber-500/15">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition cursor-pointer hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Add Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
