import { useState } from 'react';
import { Download, Printer, Calendar, Clock, Target, CheckCircle, PartyPopper, Eye, FileText, Users, Home, Camera, Sparkles, Hammer, Rocket, Trash2, BarChart3 } from 'lucide-react';
import jsPDF from 'jspdf';

const timelineSteps = [
  { name: 'Closing & Move-Out', daysBefore: 0, description: 'Final walkthrough, documents signed, keys handed over.', icon: PartyPopper },
  { name: 'Final Walkthrough', daysBefore: 1, description: 'Buyer conducts final inspection.', icon: Eye },
  { name: 'Closing Preparation', daysBefore: 3, description: 'Review closing documents and wire instructions.', icon: FileText },
  { name: 'Contingencies Removed', daysBefore: 21, description: 'Inspection, appraisal, and financing satisfied.', icon: CheckCircle },
  { name: 'Appraisal Completed', daysBefore: 28, description: 'Lender appraisal finalized.', icon: BarChart3 },
  { name: 'Inspection & Negotiations', daysBefore: 35, description: 'Buyer inspection and repair negotiations.', icon: Hammer },
  { name: 'Offer Accepted', daysBefore: 42, description: 'Contract signed, EMD deposited.', icon: Users },
  { name: 'Active Listing', daysBefore: 49, description: 'Property live on MLS, showings begin.', icon: Home },
  { name: 'Marketing Launch', daysBefore: 56, description: 'Professional photos and virtual tour live.', icon: Camera },
  { name: 'Staging & Final Touches', daysBefore: 63, description: 'Professional staging and curb appeal perfected.', icon: Sparkles },
  { name: 'MLS "Coming Soon"', daysBefore: 70, description: 'Pre-marketing begins to generate buzz.', icon: Rocket },
  { name: 'Declutter & Clean', daysBefore: 77, description: 'Deep cleaning and depersonalization.', icon: Trash2 },
  { name: 'Initial Strategy', daysBefore: 84, description: 'Meet with Khairi, pricing and plan finalized.', icon: Target }
];

const SmartSellTimeline = () => {
  const [targetDate, setTargetDate] = useState('');
  const [calculatedTimeline, setCalculatedTimeline] = useState<any[] | null>(null);

  const calculate = () => {
    if (!targetDate) return;
    const closing = new Date(targetDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    const daysUntil = Math.ceil((closing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const scale = Math.max(daysUntil / 84, 0.5);

    const timeline = timelineSteps.map(step => {
      const stepDate = new Date(closing);
      stepDate.setDate(closing.getDate() - Math.round(step.daysBefore * scale));
      if (stepDate < today) stepDate.setTime(today.getTime());
      
      return {
        ...step,
        date: stepDate,
        formatted: stepDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    setCalculatedTimeline(timeline);
  };

  const downloadPDF = () => {
    if (!calculatedTimeline) return;
    const doc = new jsPDF();
    const teal = [74, 155, 155];
    doc.setFontSize(20);
    doc.text('Smart-Sell Reverse Timeline', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('Khairi Shabazz | Richmond Real Estate', 105, 28, { align: 'center' });
    doc.line(20, 32, 190, 32);
    
    let y = 50;
    calculatedTimeline.forEach((step, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${i + 1}. ${step.name}`, 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(step.formatted, 150, y, { align: 'right' });
      y += 7;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const desc = doc.splitTextToSize(step.description, 160);
      doc.text(desc, 20, y);
      y += desc.length * 5 + 5;
      doc.setFontSize(12);
    });
    doc.save(`Khairi-Shabazz-Timeline-${targetDate}.pdf`);
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
      <div className="text-center mb-12">
        <h3 className="font-display text-3xl text-[var(--charcoal)] mb-4">Smart-Sell Reverse Timeline</h3>
        <p className="text-[var(--dark-gray)] max-w-2xl mx-auto">Your personalized roadmap from "Thinking about it" to "Sold." Enter your target closing date to begin.</p>
      </div>

      <div className="max-w-md mx-auto flex gap-4 mb-12">
        <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
        <button onClick={calculate} className="bg-[var(--teal)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-all">Calculate</button>
      </div>

      {calculatedTimeline && (
        <div className="space-y-6">
          <div className="flex justify-end gap-4 mb-6">
            <button onClick={downloadPDF} className="text-[var(--teal)] flex items-center gap-2 font-semibold hover:underline"><Download size={18} /> Export PDF</button>
            <button onClick={() => window.print()} className="text-[var(--teal)] flex items-center gap-2 font-semibold hover:underline"><Printer size={18} /> Print</button>
          </div>
          <div className="grid gap-4">
            {calculatedTimeline.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--teal-pale)] flex items-center justify-center flex-shrink-0">
                  <step.icon className="text-[var(--teal)] w-6 h-6" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-[var(--charcoal)] text-lg">{step.name}</h4>
                    <span className="text-[var(--teal)] font-bold text-sm">{step.formatted}</span>
                  </div>
                  <p className="text-[var(--dark-gray)] text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSellTimeline;
