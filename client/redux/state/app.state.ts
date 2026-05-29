import { Theme } from "@/interfaces";

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

export interface IAppInitalState {
  modalState: ModalActionPayload | null;
  appLoading: boolean;
  theme: Theme;
}
