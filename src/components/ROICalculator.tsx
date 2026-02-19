import { useState, useEffect } from 'react';
import { Download, Printer, Info, Utensils, Droplets, Paintbrush, Square, Building2, RectangleHorizontal, Box, Leaf, Layers, Home, Wind, Wrench, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const improvementROIs: Record<string, any> = {
  'kitchen-remodel': { roi: 60, name: 'Kitchen Remodel', icon: Utensils, description: 'Impactful improvements for home value.', costRange: { min: 15000, max: 75000 } },
  'bathroom-remodel': { roi: 58, name: 'Bathroom Remodel', icon: Droplets, description: 'Essential for modernizing older homes.', costRange: { min: 10000, max: 35000 } },
  'paint-interior': { roi: 107, name: 'Interior Paint', icon: Paintbrush, description: 'Highest ROI improvement - low cost, high impact.', costRange: { min: 2000, max: 8000 } },
  'paint-exterior': { roi: 55, name: 'Exterior Paint', icon: Paintbrush, description: 'Important for first impressions.', costRange: { min: 3000, max: 12000 } },
  'flooring': { roi: 70, name: 'New Flooring', icon: Square, description: 'High impact on buyer perception.', costRange: { min: 5000, max: 25000 } },
  'landscaping': { roi: 100, name: 'Landscaping', icon: Leaf, description: 'Dramatically improves curb appeal.', costRange: { min: 2000, max: 15000 } },
  'roof-replacement': { roi: 60, name: 'Roof Replacement', icon: Building2, description: 'Often necessary for sale peace of mind.', costRange: { min: 8000, max: 30000 } },
  'custom': { roi: 0, name: 'Custom Improvement', icon: Wrench, description: 'Enter your own ROI percentage.', costRange: null }
};

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    improvementType: '',
    improvementCost: '',
    currentHomeValue: '',
    expectedROI: 0
  });

  const [results, setResults] = useState({
    improvementCost: 0,
    currentHomeValue: 0,
    expectedROI: 0,
    valueIncrease: 0,
    netGain: 0,
    isWorthIt: false,
    recommendation: ''
  });

  useEffect(() => {
    const cost = parseFloat(formData.improvementCost.replace(/,/g, '')) || 0;
    const value = parseFloat(formData.currentHomeValue.replace(/,/g, '')) || 0;
    let roi = parseFloat(formData.expectedROI.toString()) || 0;

    if (formData.improvementType && formData.improvementType !== 'custom' && roi === 0) {
      roi = improvementROIs[formData.improvementType]?.roi || 0;
    }

    const increase = (cost * roi) / 100;
    const gain = increase - cost;
    const worthIt = gain > 0 || (roi >= 70);

    let rec = '';
    if (roi >= 80) rec = 'Excellent investment! This typically provides strong returns and significantly increases appeal.';
    else if (roi >= 60) rec = 'Good investment. Provides solid returns and helps your home sell faster.';
    else rec = 'Moderate investment. Consider if it is essential for the sale or your quality of life.';

    setResults({
      improvementCost: cost,
      currentHomeValue: value,
      expectedROI: roi,
      valueIncrease: increase,
      netGain: gain,
      isWorthIt: worthIt,
      recommendation: rec
    });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['improvementCost', 'currentHomeValue'].includes(name)) {
      const numericValue = value.replace(/,/g, '');
      if (numericValue === '' || /^\d+$/.test(numericValue)) {
        const formattedValue = numericValue === '' ? '' : parseInt(numericValue).toLocaleString('en-US');
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const teal = [74, 155, 155];
    doc.setFontSize(20);
    doc.text('Home Improvement ROI Report', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('Khairi Shabazz | Richmond Real Estate', 105, 28, { align: 'center' });
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.line(20, 32, 190, 32);
    
    let y = 50;
    doc.setTextColor(0, 0, 0);
    doc.text(`Improvement: ${improvementROIs[formData.improvementType]?.name || 'Custom'}`, 20, y); y += 10;
    doc.text(`Cost: ${formatCurrency(results.improvementCost)}`, 20, y); y += 10;
    doc.text(`Expected ROI: ${results.expectedROI}%`, 20, y); y += 10;
    doc.text(`Estimated Value Increase: ${formatCurrency(results.valueIncrease)}`, 20, y); y += 15;
    
    doc.setFont(undefined, 'bold');
    doc.text(`Net Gain/Loss: ${formatCurrency(results.netGain)}`, 20, y);
    
    doc.save(`Khairi-Shabazz-ROI-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="font-display text-2xl text-[var(--charcoal)] mb-2">ROI Calculator</h3>
          <p className="text-[var(--dark-gray)] text-sm mb-8">See which Richmond home improvements add the most value.</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Improvement Type</label>
              <select name="improvementType" value={formData.improvementType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none">
                <option value="">Select type</option>
                {Object.keys(improvementROIs).map(key => (
                  <option key={key} value={key}>{improvementROIs[key].name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Estimated Cost ($)</label>
              <input name="improvementCost" value={formData.improvementCost} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" placeholder="25,000" />
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-8 flex flex-col justify-between border ${results.isWorthIt ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              {results.isWorthIt ? <CheckCircle className="text-green-600" /> : <XCircle className="text-orange-600" />}
              <span className={`font-bold uppercase tracking-wider text-sm ${results.isWorthIt ? 'text-green-600' : 'text-orange-600'}`}>
                {results.isWorthIt ? 'Recommended' : 'Consider Carefully'}
              </span>
            </div>
            <h2 className={`text-5xl font-display font-bold mb-4 ${results.isWorthIt ? 'text-green-700' : 'text-orange-700'}`}>{results.expectedROI}% ROI</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{results.recommendation}</p>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Value Increase</span>
              <span className="font-semibold text-green-600">+{formatCurrency(results.valueIncrease)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Net Gain/Loss</span>
              <span className={`font-bold ${results.netGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(results.netGain)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={downloadPDF} className="bg-[var(--charcoal)] text-white py-4 rounded-xl font-semibold hover:bg-black transition-all flex items-center justify-center gap-2">
              <Download size={18} /> PDF
            </button>
            <button onClick={() => window.print()} className="bg-white text-[var(--charcoal)] border border-gray-200 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Printer size={18} /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
