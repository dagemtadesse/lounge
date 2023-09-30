import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  activeModalId?: string;
  alert?: {
    message: string;
    type: "error" | "success" | "info" | "warning";
  };
};

const initialState: ModalState = {
  alert: {
    message: "Failed",
    type: "error",
  },
};

export const appSlice = createSlice({
  name: "modal-slice",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.activeModalId = action.payload;
    },

    closeModal(state) {
      state.activeModalId = undefined;
    },

    setAlert(state, action: PayloadAction<any>) {
      state.alert = action.payload;
    },

    removeAlert(state) {
      state.alert = undefined;
    },
  },
});

export const { closeModal, openModal, setAlert, removeAlert } =
  appSlice.actions;

export default appSlice.reducer;
