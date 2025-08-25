
import type { Tables } from "./database.types";

export type CsvFile = Tables<'csv_files'>;

export type Order = Tables<'orders'> & {
  file: {
    name: string | null;
  } | null;
};

export type Profile = Tables<'profiles'>;

export type Transaction = Tables<'transactions'>;

export type ExclusiveLeadBatch = Tables<'exclusive_lead_batches'>;

export type User = {
  id?: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Client';
};
