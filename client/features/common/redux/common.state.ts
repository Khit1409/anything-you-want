import { Theme } from "../interfaces/common.interface";

export enum ModalState {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
}

export type ModalActionPayload = {
  message: string;
  state: ModalState;
  handle?: () => unknown;
};

export interface CommonInitalState {
  modalState: ModalActionPayload | null;
  loading: boolean;
  theme: Theme;
}
