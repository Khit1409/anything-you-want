export enum PaymentLinkStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  UNDERPAID = "UNDERPAID",
  PAID = "PAID",
  EXPIRED = "EXPIRED",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
}

export enum PaymentType {
  BANKING = "banking",
  MOMO = "momo",
  DELIVERED = "delivered",
}

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

export type PaymentSupports = { name: PaymentType; enabled: boolean }[];
