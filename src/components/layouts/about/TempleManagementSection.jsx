import { User } from 'lucide-react';

const staticCommitteeMembers = [
    {
        name_en: "Lion Sri R.K Dash Ropu",
        name_bn: "লায়ন শ্রী আর.কে দাশ রূপু",
        role_en: "President",
        role_bn: "সভাপতি",
        image: ""
    },
    {
        name_en: "Sri Rubel Dey",
        name_bn: "শ্রী রুবেল দে",
        role_en: "General Secretary",
        role_bn: "সাধারণ সম্পাদক",
        image: ""
    },
    {
        name_en: "Sri Munmun Datta Munna",
        name_bn: "শ্রী মুনমুন দত্ত মুন্না",
        role_en: "Joint General Secretary",
        role_bn: "যুগ্ম সাধারণ সম্পাদক",
        image: ""
    },
    {
        name_en: "Sri Mihir Dey",
        name_bn: "শ্রী মিহির দে",
        role_en: "Joint General Secretary",
        role_bn: "যুগ্ম সাধারণ সম্পাদক",
        image: ""
    },
    {
        name_en: "Sri Debashish Nath",
        name_bn: "শ্রী দেবাশীষ নাথ",
        role_en: "Life Member",
        role_bn: "আজীবন সদস্য",
        image: ""
    },
    {
        name_en: "Sri Prodip Mahajan",
        name_bn: "শ্রী প্রদীপ মহাজন",
        role_en: "Honorable Co-Treasurer",
        role_bn: "সম্মানিত সহ অর্থ সম্পাদক",
        image: ""
    }
];

export default function TempleManagementSection({ t, members = [], lang }) {
    
    const displayMembers = members.length > 0 ? members : staticCommitteeMembers;

    return (
        <section className="py-12 md:py-16">
            <div className="text-center space-y-3 mb-12">
                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white shadow-sm">
                    {t?.committeeBadge || "COMMITTEE"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#7c1d1d] dark:text-amber-200">
                    {t?.committeeTitle || "Temple Management"}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/70 max-w-xl mx-auto">
                    {t?.committeeSubtitle || "The dedicated individuals serving and guiding the temple operations."}
                </p>
            </div>

            {displayMembers.length === 0 ? (
                <p className="text-center text-xs italic text-stone-500 dark:text-amber-200/50 py-8">
                    {t?.noMembersText || "Committee member details will be updated soon."}
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {displayMembers.map((member, idx) => {
                        const name = (lang === 'bn' ? (member.name_bn || member.name) : (member.name_en || member.name)) || "Committee Member";
                        const role = (lang === 'bn' ? (member.role_bn || member.role) : (member.role_en || member.role)) || "Member";

                        return (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                {/* Arch Shape Avatar Frame */}
                                <div className="w-32 h-36 sm:w-36 sm:h-40 p-1.5 rounded-t-full border-2 border-amber-500/70 dark:border-amber-400/50 bg-amber-100/50 dark:bg-[#1a0408] shadow-sm group-hover:shadow-md group-hover:border-amber-500 transition-all mb-3">
                                    <div className="w-full h-full rounded-t-full overflow-hidden bg-amber-200/40 dark:bg-[#320a10] flex items-center justify-center">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <User className="w-10 h-10 text-amber-700/50 dark:text-amber-300/40" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-stone-900 dark:text-cream-100">
                                    {name}
                                </h3>
                                <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400 mt-0.5">
                                    {role}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}