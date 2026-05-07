import { Theme } from "@/interfaces/common/theme.interface";

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
  appLoading: null | boolean;
  theme: Theme;
}
