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
          placeholder="Search for Contacts and Chat Rooms"
          InputProps={{
            sx: {},
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
