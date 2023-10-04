"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setQuery } from "@/store/reducers/chatRoom";
import { Search } from "@mui/icons-material";
import { Box, TextField, InputAdornment } from "@mui/material";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.chatRoom);

  return (
    <>
      <Box
        p={1.5}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "background.default",
        }}
      >
        <TextField
          fullWidth
          sx={{}}
          size="small"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search for chats"
          InputProps={{
            sx: {
              bgcolor: "rgba(255,255,255,0.2)",
              border: 0,
              borderRadius: 100,
            },
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};
