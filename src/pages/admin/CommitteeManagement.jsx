/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { translations } from "../../locales/translations";
import { useLanguage } from "../../context/LanguageContext";
import { getAllCommitteeMembers } from "../../lib/api/comittee";
import { createCommitteeMember, updateCommitteeMember, deleteCommitteeMember } from "../../lib/actions/comittee";
import CommitteeForm from "../../components/admin/committee/CommitteeForm";

export default function CommitteeManagementPage() {
    const { lang } = useLanguage();
    const t = translations[lang]?.adminCommittee || translations.en.adminCommittee;

    const [membersList, setMembersList] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback({ type: "", message: "" }), 4000);
    };

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        const json = await getAllCommitteeMembers();
        if (json.success && Array.isArray(json.data)) {
            setMembersList(json.data);
            if (json.data.length > 0 && !selectedMemberId) {
                setSelectedMemberId(json.data[0].id);
            }
        }
        setLoading(false);
    }, [selectedMemberId]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const handleCreateMember = async (formData) => {
        setSubmitting(true);
        const json = await createCommitteeMember(formData);
        if (json.success) {
            showFeedback("success", json.message || "Member added!");
            setIsAdding(false);
            await fetchMembers();
            if (json.data?.id) setSelectedMemberId(json.data.id);
        } else {
            showFeedback("error", json.message || "Failed to add member");
        }
        setSubmitting(false);
    };

    const handleUpdateMember = async (formData) => {
        if (!selectedMemberId) return;
        setSubmitting(true);
        const json = await updateCommitteeMember(selectedMemberId, formData);
        if (json.success) {
            showFeedback("success", json.message || "Member updated!");
            await fetchMembers();
        } else {
            showFeedback("error", json.message || "Failed to update member");
        }
        setSubmitting(false);
    };

    const executeDeleteMember = async () => {
        setShowDeleteModal(false);
        setSubmitting(true);
        const json = await deleteCommitteeMember(selectedMemberId);
        if (json.success) {
            showFeedback("success", json.message || "Member deleted!");
            setSelectedMemberId("");
            await fetchMembers();
        } else {
            showFeedback("error", json.message || "Failed to delete member");
        }
        setSubmitting(false);
    };

    const selectedMember = membersList.find((m) => m.id === selectedMemberId);

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setIsAdding(true);
                        setFeedback({ type: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    {t.btnAddMember}
                </button>
            </div>

            {!isAdding && (
                <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-4 rounded-2xl shadow-sm max-w-sm">
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1.5">
                        {t.selectMemberPlaceholder || "Select Member to Edit"}
                    </label>
                    <select
                        value={selectedMemberId}
                        onChange={(e) => setSelectedMemberId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                    >
                        <option value="" disabled>{t.selectMemberPlaceholder}</option>
                        {membersList.map((member) => (
                            <option key={member.id} value={member.id}>
                                {lang === "bn" ? member.name_bn || member.nameBn : member.name_en || member.nameEn} - ({lang === "bn" ? member.position_bn || member.positionBn : member.position_en || member.positionEn})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {feedback.message && (
                <div
                    className={`flex items-center gap-2 p-4 rounded-2xl text-xs font-semibold border ${feedback.type === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 border-red-500/30 text-red-600"
                        }`}
                >
                    {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{feedback.message}</span>
                </div>
            )}

            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm">
                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                    </div>
                ) : isAdding ? (
                    <CommitteeForm
                        t={t}
                        isEditMode={false}
                        onSubmit={handleCreateMember}
                        onCancel={() => setIsAdding(false)}
                        submitting={submitting}
                    />
                ) : selectedMember ? (
                    <CommitteeForm
                        t={t}
                        initialData={selectedMember}
                        isEditMode={true}
                        onSubmit={handleUpdateMember}
                        onDelete={() => setShowDeleteModal(true)}
                        submitting={submitting}
                    />
                ) : (
                    <div className="text-center py-12 text-xs text-stone-500 dark:text-stone-400">
                        {t.selectMemberPlaceholder}
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600">
                            <div className="p-3 rounded-2xl bg-red-500/10">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                                    {t.confirmDelete || "Are you sure?"}
                                </h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
                            >
                                {t.btnCancel}
                            </button>
                            <button
                                type="button"
                                onClick={executeDeleteMember}
                                disabled={submitting}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {submitting ? "Deleting..." : t.btnDelete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}