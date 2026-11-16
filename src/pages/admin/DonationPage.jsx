/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Calendar, X } from 'lucide-react';
import { fetchDonations } from '../../lib/api/donations';
import { deleteDonation, updateDonationStatus } from '../../lib/actions/donations';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import DonationTableList from '../../components/admin/donations/DonationTableList';
import DonationDetailPanel from '../../components/admin/donations/DonationDetailPanel';
import DeleteDonationModal from '../../components/admin/donations/DeleteDonationModal';

export default function DonationManagement() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.adminDonations || translations?.en?.adminDonations || {
        title: "Donation Management",
        subtitle: "Review and verify contributions submitted by devotees and donors.",
        refresh: "Refresh"
    };

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [statusUpdating, setStatusUpdating] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [deleteModalId, setDeleteModalId] = useState(null);
    const [filterDate, setFilterDate] = useState('');

    const loadDonations = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetchDonations();
            if (res && res.success) {
                setDonations(res.data || []);
            } else {
                setError(res.message || 'Failed to load donations.');
            }
        } catch (err) {
            console.error(err);
            setError('Network error while fetching donations.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDonations();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        setStatusUpdating(id);
        setError('');
        try {
            const res = await updateDonationStatus(id, newStatus);
            if (res && res.success) {
                const updatedList = donations.map((item) =>
                    item.id === id ? res.data : item
                );
                setDonations(updatedList);
                if (selectedDonation?.id === id) {
                    setSelectedDonation(res.data);
                }
            } else {
                setError(res.message || 'Failed to update status.');
            }
        } catch (err) {
            console.error(err);
            setError('Error updating donation status.');
        } finally {
            setStatusUpdating(null);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModalId) return;

        setActionLoading(deleteModalId);
        try {
            const res = await deleteDonation(deleteModalId);
            if (res && res.success) {
                setDonations(donations.filter((item) => item.id !== deleteModalId));
                if (selectedDonation?.id === deleteModalId) setSelectedDonation(null);
                setDeleteModalId(null);
            } else {
                setError(res.message || 'Failed to delete donation.');
            }
        } catch (err) {
            console.error(err);
            setError('Error deleting donation.');
        } finally {
            setActionLoading(null);
        }
    };

    const filteredDonations = donations.filter((item) => {
        if (!filterDate) return true;
        if (!item.createdAt) return false;
        const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
        return itemDate === filterDate;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                        {t.title}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        {t.subtitle}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-amber-500/30 px-3 py-2 rounded-xl">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="bg-transparent text-xs text-stone-800 dark:text-cream-100 focus:outline-none cursor-pointer"
                        />
                        {filterDate && (
                            <button
                                type="button"
                                onClick={() => setFilterDate('')}
                                className="text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer"
                                title="Clear Date Filter"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={loadDonations}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        {t.refresh}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className={`${selectedDonation ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
                    <DonationTableList
                        donations={filteredDonations}
                        loading={loading}
                        selectedDonation={selectedDonation}
                        onSelectDonation={(item) => setSelectedDonation(item)}
                        onCloseSelected={() => setSelectedDonation(null)}
                        onDeleteClick={(id) => setDeleteModalId(id)}
                        statusUpdating={statusUpdating}
                        onStatusChange={handleStatusChange}
                        actionLoading={actionLoading}
                    />
                </div>

                {selectedDonation && (
                    <div className="hidden lg:block lg:col-span-5">
                        <DonationDetailPanel
                            donation={selectedDonation}
                            statusUpdating={statusUpdating}
                            onStatusChange={handleStatusChange}
                            onDeleteClick={(id) => setDeleteModalId(id)}
                            onClose={() => setSelectedDonation(null)}
                        />
                    </div>
                )}
            </div>

            <DeleteDonationModal
                isOpen={Boolean(deleteModalId)}
                onClose={() => setDeleteModalId(null)}
                onConfirm={handleDeleteConfirm}
                isDeleting={actionLoading === deleteModalId}
            />
        </div>
    );
}