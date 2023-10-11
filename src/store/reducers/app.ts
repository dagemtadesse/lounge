import { Room } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  activeModalId?: string;
  roomDetail?: Room;
  alert?: {
    message: string;
    type: "error" | "success" | "info" | "warning";
  };
};

const initialState: ModalState = {};

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

    setAlert(
      state,
      action: PayloadAction<{
        message: string;
        type: "error" | "success" | "info" | "warning";
      }>
    ) {
      state.alert = action.payload;
    },

    removeAlert(state) {
      state.alert = undefined;
    },

    setRoomDetail(state, action: PayloadAction<Room | undefined>) {
      state.roomDetail = action.payload;
    },
  },
});

export const { closeModal, openModal, setAlert, removeAlert, setRoomDetail } =
  appSlice.actions;

export default appSlice.reducer;
