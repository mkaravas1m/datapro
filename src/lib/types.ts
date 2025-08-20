export type CsvFile = {
  id: string;
  name: string;
  description: string;
  category: string;
  rowCount: number;
  price: number;
  status: 'available' | 'sold' | 'archived';
  sample: string[][];
};

export type Order = {
  id: string;
  fileId: string;
  fileName: string;
  orderDate: string;
  amount: number;
  status: 'paid' | 'refunded' | 'failed';
  invoiceUrl: string;
  downloadUrl: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Client';
};

export type Transaction = {
  id: string;
  date: string;
  type: 'deposit' | 'debit' | 'refund' | 'adjustment';
  amount: number;
  description: string;
  stripeRef?: string;
};

export type ExclusiveLeadBatch = {
    id: string;
    name: string;
    pricePerLead: number;
    totalLeads: number;
    availableLeads: number;
    status: 'available' | 'sold_out' | 'archived';
};
