export default function BookingStats({ bookings = [] }) {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;

    const stats = [
        { label: "Total Bookings", count: total, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
        { label: "Pending", count: pending, color: "text-blue-600 bg-blue-500/10 border-blue-500/20" },
        { label: "Confirmed", count: confirmed, color: "text-green-600 bg-green-500/10 border-green-500/20" },
        { label: "Completed", count: completed, color: "text-purple-600 bg-purple-500/10 border-purple-500/20" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${stat.color} flex flex-col justify-between`}>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">{stat.label}</span>
                    <span className="text-2xl font-serif font-bold mt-2">{stat.count}</span>
                </div>
            ))}
        </div>
    );
}