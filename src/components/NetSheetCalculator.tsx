import { useState, useEffect } from 'react';
import { Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import { RICHMOND_LOCALITIES, TITLE_COMPANY_FEES_RICHMOND, getTransferAndRecordingTaxes } from '../data/richmondVaRates';

const NetSheetCalculator = () => {
  const [formData, setFormData] = useState({
    listingPrice: '',
    mortgagePayoff: '',
    propertyTaxes: '',
    closingDate: '',
    commissionFees: 6,
    propertyLocation: 'Richmond City',
    transferTax: '',
    recordingTax: '',
    hoaFees: '',
    homeWarranty: '',
    repairsConcessions: '',
    miscClosingCosts: '',
    useAutoCalculateTaxes: true
  });
  const [showDetailedCosts, setShowDetailedCosts] = useState(false);
  const [netProceeds, setNetProceeds] = useState(0);
  const [breakdown, setBreakdown] = useState({
    listingPrice: 0,
    mortgagePayoff: 0,
    proratedTaxes: 0,
    commission: 0,
    transferTax: 0,
    recordingTax: 0,
    titleFees: 0,
    hoaFees: 0,
    homeWarranty: 0,
    repairsConcessions: 0,
    miscClosingCosts: 0,
    totalClosingCosts: 0,
    netAmount: 0
  });

  const calculateProratedTaxes = (yearlyTaxes: number, closingDate: string) => {
    if (!closingDate || !yearlyTaxes) return 0;
    const closing = new Date(closingDate);
    const year = closing.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const daysInYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
    const daysElapsed = Math.floor((closing.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return (yearlyTaxes / daysInYear) * daysElapsed;
  };

  useEffect(() => {
    const listingPrice = parseFloat(formData.listingPrice.replace(/,/g, '')) || 0;
    const mortgagePayoff = parseFloat(formData.mortgagePayoff.replace(/,/g, '')) || 0;
    const yearlyTaxes = parseFloat(formData.propertyTaxes.replace(/,/g, '')) || 0;
    const commissionPercent = parseFloat(formData.commissionFees.toString()) || 0;
    
    let transferTax = 0;
    let recordingTax = 0;
    if (formData.useAutoCalculateTaxes && listingPrice > 0) {
      const calculated = getTransferAndRecordingTaxes(listingPrice, formData.propertyLocation);
      transferTax = calculated.transferTax;
      recordingTax = calculated.recordingTax;
    } else {
      transferTax = parseFloat(formData.transferTax.replace(/,/g, '')) || 0;
      recordingTax = parseFloat(formData.recordingTax.replace(/,/g, '')) || 0;
    }

    const titleFees = TITLE_COMPANY_FEES_RICHMOND.total;
    const hoaFees = parseFloat(formData.hoaFees.replace(/,/g, '')) || 0;
    const homeWarranty = parseFloat(formData.homeWarranty.replace(/,/g, '')) || 0;
    const repairsConcessions = parseFloat(formData.repairsConcessions.replace(/,/g, '')) || 0;
    const miscCosts = parseFloat(formData.miscClosingCosts.replace(/,/g, '')) || 0;

    const proratedTaxes = calculateProratedTaxes(yearlyTaxes, formData.closingDate);
    const commission = (listingPrice * commissionPercent) / 100;
    const totalClosingCosts = transferTax + recordingTax + titleFees + hoaFees + homeWarranty + repairsConcessions + miscCosts;
    const netAmount = listingPrice - mortgagePayoff - proratedTaxes - commission - totalClosingCosts;

    setBreakdown({
      listingPrice,
      mortgagePayoff,
      proratedTaxes,
      commission,
      transferTax,
      recordingTax,
      titleFees,
      hoaFees,
      homeWarranty,
      repairsConcessions,
      miscClosingCosts: miscCosts,
      totalClosingCosts,
      netAmount: Math.max(0, netAmount)
    });
    setNetProceeds(Math.max(0, netAmount));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['listingPrice', 'mortgagePayoff', 'propertyTaxes', 'transferTax', 'recordingTax', 'hoaFees', 'homeWarranty', 'repairsConcessions', 'miscClosingCosts'].includes(name)) {
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const teal = [74, 155, 155]; // #4A9B9B
    const charcoal = [45, 52, 54]; // #2D3436
    
    doc.setFontSize(20);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text('Seller Net Sheet Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text('Khairi Shabazz | Real Estate Expert', 105, 28, { align: 'center' });
    
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40);
    
    doc.setFontSize(12);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    let yPos = 55;
    
    const addRow = (label: string, value: string, isBold = false) => {
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(label, 20, yPos);
      doc.text(value, 150, yPos, { align: 'right' });
      yPos += 10;
    };

    addRow('Listing Price:', formatCurrency(breakdown.listingPrice), true);
    addRow('Less: Mortgage Payoff', `-${formatCurrency(breakdown.mortgagePayoff)}`);
    addRow('Less: Prorated Taxes', `-${formatCurrency(breakdown.proratedTaxes)}`);
    addRow('Less: Commission (' + formData.commissionFees + '%)', `-${formatCurrency(breakdown.commission)}`);
    addRow('Less: Transfer Tax', `-${formatCurrency(breakdown.transferTax)}`);
    addRow('Less: Recording Tax', `-${formatCurrency(breakdown.recordingTax)}`);
    addRow('Less: Title Company Fees', `-${formatCurrency(breakdown.titleFees)}`);
    addRow('Less: HOA Fees', `-${formatCurrency(breakdown.hoaFees)}`);
    addRow('Less: Home Warranty', `-${formatCurrency(breakdown.homeWarranty)}`);
    addRow('Less: Repairs/Concessions', `-${formatCurrency(breakdown.repairsConcessions)}`);
    addRow('Less: Other Closing Costs', `-${formatCurrency(breakdown.miscClosingCosts)}`);
    
    yPos += 5;
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Estimated Net Proceeds:', 20, yPos);
    doc.setFontSize(18);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text(formatCurrency(netProceeds), 150, yPos, { align: 'right' });
    
    doc.save(`Khairi-Shabazz-Net-Sheet-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl text-[var(--charcoal)] mb-2">Net Sheet Calculator</h3>
            <p className="text-[var(--dark-gray)] text-sm mb-8">Estimate your walk-away amount after all Richmond-area closing costs.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Listing Price ($)</label>
              <input name="listingPrice" value={formData.listingPrice} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" placeholder="500,000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Mortgage Payoff ($)</label>
              <input name="mortgagePayoff" value={formData.mortgagePayoff} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" placeholder="300,000" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Property Location</label>
              <select name="propertyLocation" value={formData.propertyLocation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none">
                {Object.keys(RICHMOND_LOCALITIES).map(loc => (
                  <option key={loc} value={loc}>{RICHMOND_LOCALITIES[loc].name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--charcoal)]">Commission (%)</label>
              <input type="number" name="commissionFees" value={formData.commissionFees} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
            </div>
          </div>

          <button onClick={() => setShowDetailedCosts(!showDetailedCosts)} className="text-[var(--teal)] text-sm font-semibold hover:underline">
            {showDetailedCosts ? '- Hide' : '+ Show'} Detailed Closing Costs
          </button>

          {showDetailedCosts && (
            <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Yearly Property Taxes ($)</label>
                  <input name="propertyTaxes" value={formData.propertyTaxes} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Closing Date</label>
                  <input type="date" name="closingDate" value={formData.closingDate} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">HOA Fees (Prorated) ($)</label>
                  <input name="hoaFees" value={formData.hoaFees} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--charcoal)]">Home Warranty ($)</label>
                  <input name="homeWarranty" value={formData.homeWarranty} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--teal)] outline-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-[var(--teal-pale)] rounded-3xl p-8 flex flex-col justify-between border border-[var(--teal)]/20">
          <div>
            <p className="text-[var(--teal-dark)] font-semibold text-sm tracking-wider uppercase mb-2">Estimated Net Proceeds</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-[var(--teal)] mb-4">{formatCurrency(netProceeds)}</h2>
            <p className="text-[var(--dark-gray)] text-sm">This is your estimated cash at closing after all Richmond-area fees and prorations.</p>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--dark-gray)]">Listing Price</span>
              <span className="font-semibold text-[var(--charcoal)]">{formatCurrency(breakdown.listingPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--dark-gray)]">Total Closing Costs</span>
              <span className="font-semibold text-red-500">-{formatCurrency(breakdown.totalClosingCosts)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--dark-gray)]">Mortgage Payoff</span>
              <span className="font-semibold text-red-500">-{formatCurrency(breakdown.mortgagePayoff)}</span>
            </div>
            <div className="pt-4 border-t border-[var(--teal)]/20 flex justify-between">
              <span className="font-bold text-[var(--charcoal)]">Walk-Away Amount</span>
              <span className="font-bold text-[var(--teal)] text-xl">{formatCurrency(netProceeds)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={downloadPDF} className="bg-[var(--teal)] text-white py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-all flex items-center justify-center gap-2">
              <Download size={18} /> PDF
            </button>
            <button onClick={() => window.print()} className="bg-white text-[var(--teal)] border border-[var(--teal)] py-4 rounded-xl font-semibold hover:bg-[var(--teal-pale)] transition-all flex items-center justify-center gap-2">
              <Printer size={18} /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetSheetCalculator;
