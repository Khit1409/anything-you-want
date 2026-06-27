export type CreateStoreInfoRequest = {
  name: string;
  avatar: string;
  thumbnail: string;
  description: string;
  phoneNumber: string;
  emailAddress: string;
};
export interface CreateStoreRequest {
  info: CreateStoreInfoRequest;
  storeCode: string; //max min 6
}
