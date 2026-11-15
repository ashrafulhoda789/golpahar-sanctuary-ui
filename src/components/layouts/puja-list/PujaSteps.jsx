
import { Sparkles } from 'lucide-react';

export default function PujaSteps({ lang }) {
  const isBn = lang === 'bn';

  const steps = [
    {
      num: '১',
      numEn: '1',
      titleBn: 'পূজা নির্বাচন',
      titleEn: 'Select Puja',
      descBn: 'তালিকা থেকে আপনার পছন্দমতো পূজা বা সেবা বেছে নিন।',
      descEn: 'Choose your preferred puja or service from the list.'
    },
    {
      num: '২',
      numEn: '2',
      titleBn: 'তথ্য প্রদান',
      titleEn: 'Provide Details',
      descBn: 'নাম, গোত্র ও অন্যান্য প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।',
      descEn: 'Fill in your name, gotra, and other required details.'
    },
    {
      num: '৩',
      numEn: '3',
      titleBn: 'নিশ্চিতকরণ',
      titleEn: 'Confirmation',
      descBn: 'প্রণামী প্রদান করে আপনার পূজার আবেদন সফলভাবে সম্পন্ন করুন।',
      descEn: 'Complete your puja request by offering the donation.'
    }
  ];

  return (
    <div className="bg-maroon-900 text-amber-100 rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-500/20 mt-16 text-center space-y-8">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" /> {isBn ? 'সহজ প্রক্রিয়া' : 'Easy Process'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 font-serif">
          {isBn ? 'তিন ধাপে পূজার আবেদন' : 'Puja Application in Three Steps'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="bg-maroon-950/60 border border-amber-500/25 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 shadow-inner"
          >
            <div className="w-12 h-12 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-lg shadow-md border border-amber-400">
              {isBn ? step.num : step.numEn}
            </div>
            <h3 className="text-lg font-bold font-serif text-amber-200">
              {isBn ? step.titleBn : step.titleEn}
            </h3>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              {isBn ? step.descBn : step.descEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}