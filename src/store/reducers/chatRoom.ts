import { Message } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatRoomSlice = {
  query: string;
  activeMessage?: {
    data: Message;
    action: "reply" | "edit";
  };
};

const initialState: ChatRoomSlice = {
  query: "",
};

export const chatRoomSlice = createSlice({
  name: "chat-room-slice",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    setActiveMessage(
      state,
      action: PayloadAction<
        | {
            data: Message;
            action: "reply" | "edit";
          }
        | undefined
      >
    ) {
      state.activeMessage = action.payload;
    },
  },
});

export const { setQuery, setActiveMessage } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
