/**
 * Richmond, VA area real estate data
 * Sources: Official county/city websites and local real estate standards
 */

export interface LocalityData {
  name: string;
  transferTaxRate: number; // as decimal, e.g. 0.001 for 0.1%
  recordingFee: number;
  propertyTaxRate: number; // as percentage, e.g. 1.20 for 1.20%
}

export const RICHMOND_LOCALITIES: Record<string, LocalityData> = {
  'Richmond City': {
    name: 'Richmond City',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 1.20,
  },
  'Henrico': {
    name: 'Henrico County',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.87,
  },
  'Chesterfield': {
    name: 'Chesterfield County',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.91,
  },
  'Hanover': {
    name: 'Hanover County',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.81,
  },
  'Chester': {
    name: 'Chester',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.91, // Chesterfield rate
  },
  'Midlothian': {
    name: 'Midlothian',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.91, // Chesterfield rate
  },
  'Ashland': {
    name: 'Ashland',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 0.81, // Hanover rate
  },
  'Other VA': {
    name: 'Other Virginia Locality',
    transferTaxRate: 0.001,
    recordingFee: 50,
    propertyTaxRate: 1.05, // VA average
  },
};

export const TITLE_COMPANY_FEES_RICHMOND = {
  closingFee: 450,
  ronESigningFee: 125,
  processingFee: 425,
  releaseServiceFee: 95,
  deedPreparation: 175,
  total: 1270,
};

export const DEFAULT_MORTGAGE_RATES = {
  '30-year': 6.26,
  '15-year': 5.54,
};

export const getTransferAndRecordingTaxes = (listingPrice: number, localityKey: string) => {
  const locality = RICHMOND_LOCALITIES[localityKey] || RICHMOND_LOCALITIES['Other VA'];
  const transferTax = Math.round(listingPrice * locality.transferTaxRate);
  const recordingTax = locality.recordingFee;
  return { transferTax, recordingTax };
};
