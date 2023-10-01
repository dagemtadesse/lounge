import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  query: string;
};

const initialState: ModalState = {
  query: ""
};

export const chatRoomSlice = createSlice({
  name: "chat-room-slice",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
