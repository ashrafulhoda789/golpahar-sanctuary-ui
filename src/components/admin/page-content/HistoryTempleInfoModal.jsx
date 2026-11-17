import { useState } from "react";
import { Sparkles, X } from "lucide-react";

export default function HistoryTempleInfoModal({
  isOpen,
  onClose,
  onSaveInfo,
  inputClass,
  labelClass,
}) {
  const [infoData, setInfoData] = useState({
    title_en: "",
    title_bn: "",
    description_en: "",
    description_bn: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveInfo(infoData);
    setInfoData({
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
            <Sparkles className="w-4 h-4 text-amber-600" /> Add New Info Box
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Title (English) *</label>
              <input
                type="text"
                required
                value={infoData.title_en}
                onChange={(e) =>
                  setInfoData({ ...infoData, title_en: e.target.value })
                }
                placeholder="e.g. Temple Entry"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title (বাংলা) *</label>
              <input
                type="text"
                required
                value={infoData.title_bn}
                onChange={(e) =>
                  setInfoData({ ...infoData, title_bn: e.target.value })
                }
                placeholder="যেমন: মন্দির প্রবেশ"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Description (English)</label>
              <textarea
                rows={3}
                value={infoData.description_en}
                onChange={(e) =>
                  setInfoData({ ...infoData, description_en: e.target.value })
                }
                placeholder="Free entry for all..."
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Description (বাংলা)</label>
              <textarea
                rows={3}
                value={infoData.description_bn}
                onChange={(e) =>
                  setInfoData({ ...infoData, description_bn: e.target.value })
                }
                placeholder="সকল ভক্তদের জন্য..."
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
              Add Info Box
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
