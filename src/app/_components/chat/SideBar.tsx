import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Contacts } from "./Contacts";
import { Rooms } from "./Rooms";

export const SideBar = () => {
  return (
    <Box
      sx={{
        borderRight: 1,
        borderColor: "divider",
        width: { xs: "100%", md: "384px" },
        maxHeight: "100vh",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Stack gap={3}>
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
            placeholder="Search for Contacts and Chat Rooms"
            InputProps={{
              sx: {},
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Rooms />
        <Contacts />
      </Stack>
    </Box>
  );
};
