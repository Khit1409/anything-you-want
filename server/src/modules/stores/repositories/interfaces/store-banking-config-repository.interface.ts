export type StoreBankingConfigType = {
  id: string;
};

export interface CreateStoreBankingConfigParams {
  store: StoreBankingConfigType;
  clientId: string;
  apiKey: string;
  checkSumKey: string;
}
