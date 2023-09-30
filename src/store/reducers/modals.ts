import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  activeModalId?: string;
};

const initialState: ModalState = {};

export const modalSlice = createSlice({
  name: "modal-slice",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.activeModalId = action.payload;
    },

    closeModal(state) {
      state.activeModalId = undefined;
    },
  },
});

export const { closeModal , openModal} = modalSlice.actions;

export default modalSlice.reducer;
