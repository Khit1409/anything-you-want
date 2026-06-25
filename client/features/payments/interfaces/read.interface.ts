export type PaymentLinkStatus =
  | "PENDING"
  | "CANCELLED"
  | "UNDERPAID"
  | "PAID"
  | "EXPIRED"
  | "PROCESSING"
  | "FAILED";
export type TaxPercentage = -2 | -1 | 0 | 5 | 10;
export type PaymentLinkItem = {
  name: string;
  quantity: number;
  price: number;
  unit?: string;
  taxPercentage?: TaxPercentage;
};

export type Transaction = {
  reference: string;
  amount: number;
  accountNumber: string;
  description: string;
  transactionDateTime: string;
  virtualAccountName: string | null;
  virtualAccountNumber: string | null;
  counterAccountBankId: string | null;
  counterAccountBankName: string | null;
  counterAccountName: string | null;
  counterAccountNumber: string | null;
};
