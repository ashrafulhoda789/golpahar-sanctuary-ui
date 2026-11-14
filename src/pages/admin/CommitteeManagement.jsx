/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, AlertTriangle, X } from "lucide-react";
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
        <div className="p-1 sm:p-4 space-y-6 text-stone-800 dark:text-cream-100 relative">

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-heading font-bold text-maroon-900 dark:text-amber-400">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/70">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setIsAdding(true);
                        setFeedback({ type: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {t.btnAddMember}
                </button>
            </div>

            {/* Dropdown Selector */}
            {!isAdding && (
                <div className="max-w-md">
                    <select
                        value={selectedMemberId}
                        onChange={(e) => setSelectedMemberId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-amber-500/20 bg-white dark:bg-[#2a080e] text-stone-800 dark:text-cream-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">{t.selectMemberPlaceholder}</option>
                        {membersList.map((member) => (
                            <option key={member.id} value={member.id}>
                                {lang === "bn" ? member.name_bn || member.nameBn : member.name_en || member.nameEn} - ({lang === "bn" ? member.position_bn || member.positionBn : member.position_en || member.positionEn})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Feedback Message */}
            {feedback.message && (
                <div
                    className={`px-4 py-3 rounded-lg text-sm font-medium ${feedback.type === "success"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                            : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-300 dark:border-red-500/30"
                        }`}
                >
                    {feedback.message}
                </div>
            )}

            {/* Form Section */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
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
                <div className="text-center py-12 bg-white dark:bg-[#2a080e] rounded-xl border border-stone-200 dark:border-amber-500/20 text-sm text-stone-500 dark:text-cream-200/70">
                    {t.selectMemberPlaceholder}
                </div>
            )}

            {/* Custom Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#2a080e] border border-stone-200 dark:border-amber-500/20 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-stone-400 hover:text-stone-700 dark:hover:text-cream-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-cream-100">
                                {t.confirmDelete || "Are you sure?"}
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-cream-200/70">
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-amber-500/10">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg border border-stone-300 dark:border-amber-500/20 text-stone-700 dark:text-cream-200 hover:bg-stone-100 dark:hover:bg-[#1a0509] text-sm font-semibold"
                            >
                                {t.btnCancel}
                            </button>
                            <button
                                type="button"
                                onClick={executeDeleteMember}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm"
                            >
                                {t.btnDelete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}