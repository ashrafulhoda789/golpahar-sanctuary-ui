import { useState, useEffect } from 'react';
import { fetchPujas } from '../../lib/api/pujas';
import { createPuja, deletePuja, updatePuja } from '../../lib/actions/pujas';
import PujaHeader from '../../components/admin/puja-management/PujaHeader';
import PujaSelector from '../../components/admin/puja-management/PujaSelector';
import PujaForm from '../../components/admin/puja-management/PujaForm';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const emptyFormState = {
    title_en: '',
    title_bn: '',
    description_en: '',
    description_bn: '',
    price: '',
    date_en: '',
    date_bn: '',
    time: '',
    type_en: '',
    type_bn: '',
    location_en: '',
    location_bn: '',
    image: '',
    rules_en: '',
    rules_bn: '',
    isAvailable: true
};

export default function PujaManagementPage() {
    const [pujas, setPujas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedPujaId, setSelectedPujaId] = useState('');
    const [formData, setFormData] = useState(emptyFormState);

    // Notification state
    const [notification, setNotification] = useState({ type: '', message: '' });

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification({ type: '', message: '' });
        }, 4000);
    };

    const loadPujas = async () => {
        setLoading(true);
        const res = await fetchPujas();
        if (res.success && Array.isArray(res.data)) {
            setPujas(res.data);
            if (res.data.length > 0 && !selectedPujaId) {
                setSelectedPujaId(res.data[0].id);
                setFormData(res.data[0]);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPujas();
    }, []);

    const handlePujaSelect = (id) => {
        if (!id) {
            handleAddClick();
            return;
        }
        setSelectedPujaId(id);
        const targetPuja = pujas.find((p) => p.id === id);
        if (targetPuja) {
            setFormData(targetPuja);
        }
    };

    const handleAddClick = () => {
        setSelectedPujaId('');
        setFormData(emptyFormState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            price: parseFloat(formData.price) || 0
        };

        let res;
        if (selectedPujaId) {
            res = await updatePuja(selectedPujaId, payload);
        } else {
            res = await createPuja(payload);
        }

        if (res.success) {
            showNotification('success', res.message || 'Saved successfully!');
            const updatedListRes = await fetchPujas();
            if (updatedListRes.success) {
                setPujas(updatedListRes.data);
                if (!selectedPujaId && res.data?.id) {
                    setSelectedPujaId(res.data.id);
                }
            }
        } else {
            showNotification('error', res.message || 'Operation failed');
        }
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!selectedPujaId) return;

        if (!window.confirm('Are you sure you want to delete this puja?')) return;

        setSaving(true);
        const res = await deletePuja(selectedPujaId);
        if (res.success) {
            showNotification('success', 'Puja deleted successfully!');
            const remaining = pujas.filter((p) => p.id !== selectedPujaId);
            setPujas(remaining);
            if (remaining.length > 0) {
                setSelectedPujaId(remaining[0].id);
                setFormData(remaining[0]);
            } else {
                handleAddClick();
            }
        } else {
            showNotification('error', res.message || 'Failed to delete');
        }
        setSaving(false);
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 min-h-screen transition-colors duration-300">
            <PujaHeader onAddClick={handleAddClick} />

            {notification.message && (
                <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border transition-all ${notification.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{notification.message}</span>
                </div>
            )}

            <PujaSelector
                pujas={pujas}
                selectedPujaId={selectedPujaId}
                onSelect={handlePujaSelect}
                loading={loading}
            />

            <PujaForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                isEditing={Boolean(selectedPujaId)}
                saving={saving}
            />
        </div>
    );
}