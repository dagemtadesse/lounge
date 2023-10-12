import { RoomWithMembers } from "@/components/room/RecentRooms";
import { Room } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  activeModalId?: string;
  activeRoom?: Room | null | undefined;
  roomDetail?: boolean;
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

    setRoomDetail(state, action: PayloadAction<boolean>) {
      state.roomDetail = action.payload;
    },

    setActiveRoom(state, action: PayloadAction<Room | undefined | null>) {
      state.activeRoom = action.payload;
    },
  },
});

export const {
  closeModal,
  openModal,
  setAlert,
  removeAlert,
  setRoomDetail,
  setActiveRoom,
} = appSlice.actions;

export default appSlice.reducer;
