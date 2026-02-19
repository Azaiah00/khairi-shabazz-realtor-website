import { useState, useEffect } from 'react';
import { Download, Copy } from 'lucide-react';
import jsPDF from 'jspdf';
import { RICHMOND_LOCALITIES, DEFAULT_MORTGAGE_RATES } from '../data/richmondVaRates';

const BuyerCalculators = () => {
  // Mortgage Calculator State
  const [mortgageData, setMortgageData] = useState({
    homePrice: '500,000',
    downPaymentPercent: '20',
    interestRate: DEFAULT_MORTGAGE_RATES['30-year'],
    loanTerm: 30
  });
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Closing Cost State
  const [closingData, setClosingData] = useState({
    homePrice: '500,000',
    downPaymentPercent: '20',
    locality: 'Richmond City',
    loanType: 'conventional',
    propertyType: 'single-family',
    includePrepaids: true,
    sellerContribution: '0'
  });
  const [closingBreakdown, setClosingBreakdown] = useState<any>(null);

  // Calculate Mortgage
  useEffect(() => {
    const price = parseFloat(mortgageData.homePrice.replace(/,/g, '')) || 0;
    const down = parseFloat(mortgageData.downPaymentPercent) || 0;
    const rate = parseFloat(mortgageData.interestRate.toString()) || 0;
    const principal = price * (1 - down / 100);
    const monthlyRate = (rate / 100) / 12;
    const payments = mortgageData.loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const p = principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
      setMonthlyPayment(p);
    } else {
      setMonthlyPayment(0);
    }
  }, [mortgageData]);

  // Calculate Closing Costs
  useEffect(() => {
    const price = parseFloat(closingData.homePrice.replace(/,/g, '')) || 0;
    const downPercent = parseFloat(closingData.downPaymentPercent) || 0;
    const downAmount = price * (downPercent / 100);
    const loanAmount = price - downAmount;
    const locality = RICHMOND_LOCALITIES[closingData.locality] || RICHMOND_LOCALITIES['Other VA'];

    const origination = loanAmount * 0.01;
    const appraisal = price > 750000 ? 600 : 450;
    const inspection = 550;
    const titleInsurance = loanAmount * 0.006;
    const recording = locality.recordingFee;
    const adminFee = 495;
    
    let prepaids = 0;
    if (closingData.includePrepaids) {
      const taxes = (price * (locality.propertyTaxRate / 100)) / 12 * 3; // 3 months
      const insurance = closingData.propertyType === 'condo' ? 500 : 1500;
      prepaids = taxes + insurance;
    }

    const totalCosts = origination + appraisal + inspection + titleInsurance + recording + adminFee + prepaids - (parseFloat(closingData.sellerContribution.replace(/,/g, '')) || 0);
    
    setClosingBreakdown({
      origination, appraisal, inspection, titleInsurance, recording, adminFee, prepaids,
      totalCosts: Math.max(0, totalCosts),
      totalCash: downAmount + Math.max(0, totalCosts)
    });
  }, [closingData]);

  const handleMortgageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'homePrice') {
      const val = value.replace(/,/g, '');
      if (val === '' || /^\d+$/.test(val)) {
        setMortgageData(prev => ({ ...prev, homePrice: val === '' ? '' : parseInt(val).toLocaleString() }));
      }
    } else {
      setMortgageData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleClosingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['homePrice', 'sellerContribution'].includes(name)) {
      const val = value.replace(/,/g, '');
      if (val === '' || /^\d+$/.test(val)) {
        setClosingData(prev => ({ ...prev, [name]: val === '' ? '' : parseInt(val).toLocaleString() }));
      }
    } else {
      setClosingData(prev => ({ ...prev, [name]: value }));
    }
  };

  const copyFromMortgage = () => {
    setClosingData(prev => ({
      ...prev,
      homePrice: mortgageData.homePrice,
      downPaymentPercent: mortgageData.downPaymentPercent
    }));
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

  const downloadPDF = () => {
    if (!closingBreakdown) return;
    const doc = new jsPDF();
    const teal = [74, 155, 155];
    doc.setFontSize(20);
    doc.text('Home Buyer Financial Estimate', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('Khairi Shabazz | Richmond Real Estate', 105, 28, { align: 'center' });
    doc.line(20, 32, 190, 32);
    
    let y = 50;
    doc.setTextColor(0, 0, 0);
    doc.text(`Home Price: ${formatCurrency(parseFloat(closingData.homePrice.replace(/,/g, '')))}`, 20, y); y += 10;
    doc.text(`Monthly P&I Payment: ${formatCurrency(monthlyPayment)}`, 20, y); y += 10;
    doc.text(`Estimated Closing Costs: ${formatCurrency(closingBreakdown.totalCosts)}`, 20, y); y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Cash Needed: ${formatCurrency(closingBreakdown.totalCash)}`, 20, y);
    
    doc.save(`Khairi-Shabazz-Buyer-Estimate.pdf`);
  };

  return (
    <div className="space-y-16">
      {/* Mortgage Calculator */}
      <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-[var(--charcoal)] mb-2">Mortgage Calculator</h3>
            <p className="text-[var(--dark-gray)] text-sm mb-8">Estimate your monthly principal and interest payments.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--charcoal)]">Home Price ($)</label>
                <input name="homePrice" value={mortgageData.homePrice} onChange={handleMortgageChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Down Payment (%)</label>
                  <input name="downPaymentPercent" type="number" value={mortgageData.downPaymentPercent} onChange={handleMortgageChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Interest Rate (%)</label>
                  <input name="interestRate" type="number" step="0.01" value={mortgageData.interestRate} onChange={handleMortgageChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--charcoal)] rounded-3xl p-8 text-white flex flex-col justify-center text-center">
            <p className="text-[var(--teal-light)] font-semibold text-sm tracking-wider uppercase mb-2">Estimated Monthly P&I</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">{formatCurrency(monthlyPayment)}</h2>
            <p className="text-gray-400 text-sm">Principal and interest only. Does not include taxes or insurance.</p>
          </div>
        </div>
      </div>

      {/* Closing Cost Calculator */}
      <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-2xl text-[var(--charcoal)] mb-2">Closing Cost Calculator</h3>
                <p className="text-[var(--dark-gray)] text-sm mb-8">Estimate total cash needed for your Richmond home purchase.</p>
              </div>
              <button onClick={copyFromMortgage} className="flex items-center gap-2 text-[var(--teal)] text-xs font-bold hover:underline bg-[var(--teal-pale)] px-3 py-2 rounded-lg">
                <Copy size={14} /> Sync from Mortgage
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Locality</label>
                  <select name="locality" value={closingData.locality} onChange={handleClosingChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none">
                    {Object.keys(RICHMOND_LOCALITIES).map(loc => <option key={loc} value={loc}>{RICHMOND_LOCALITIES[loc].name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Loan Type</label>
                  <select name="loanType" value={closingData.loanType} onChange={handleClosingChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none">
                    <option value="conventional">Conventional</option>
                    <option value="FHA">FHA</option>
                    <option value="VA">VA Loan</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--charcoal)]">Seller Contribution ($)</label>
                <input name="sellerContribution" value={closingData.sellerContribution} onChange={handleClosingChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" placeholder="0" />
              </div>
            </div>
          </div>
          <div className="bg-[var(--teal-pale)] rounded-3xl p-8 flex flex-col justify-between border border-[var(--teal)]/20">
            <div>
              <p className="text-[var(--teal-dark)] font-semibold text-sm tracking-wider uppercase mb-2">Total Cash Needed</p>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-[var(--teal)] mb-4">{formatCurrency(closingBreakdown?.totalCash || 0)}</h2>
              <p className="text-[var(--dark-gray)] text-sm">Includes down payment and estimated closing costs.</p>
            </div>
            <div className="space-y-3 my-8 border-t border-[var(--teal)]/20 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--dark-gray)]">Closing Costs</span>
                <span className="font-semibold text-[var(--charcoal)]">{formatCurrency(closingBreakdown?.totalCosts || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--dark-gray)]">Down Payment</span>
                <span className="font-semibold text-[var(--charcoal)]">{formatCurrency(parseFloat(closingData.homePrice.replace(/,/g, '')) * (parseFloat(closingData.downPaymentPercent) / 100) || 0)}</span>
              </div>
            </div>
            <button onClick={downloadPDF} className="w-full bg-[var(--teal)] text-white py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download Full Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerCalculators;
