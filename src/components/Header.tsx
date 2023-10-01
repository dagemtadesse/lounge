"use client";

import {
  AppBar,
  Avatar,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Logo } from "../_icons/logo";
import { ROUTES } from "@/routes";
import Link from "next/link";
import { Add, GroupAdd } from "@mui/icons-material";
import { CreateChatRoomModal } from "./modals/CreateChatRoomModal";
import { openModal } from "@/store/reducers/modals";
import { useAppDispatch } from "@/store";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useSession();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  return (
    <AppBar
      sx={{
        height: { sx: "auto", md: "100vh" },
        width: "auto",
        left: 0,
        right: "auto",
        bgcolor: "transparent",
      }}
      position="relative"
      color="primary"
    >
      <Stack
        sx={{
          p: 1,
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <Stack>
          <Link href={ROUTES.HOME}>
            <Button
              color="secondary"
              sx={{
                display: { sm: "inline-flex", md: "block" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Logo />
              <Typography
                variant="subtitle2"
                fontWeight={"bold"}
                textTransform="none"
              >
                Lounge
              </Typography>
            </Button>
          </Link>
        </Stack>

        {data && (
          <Stack sx={{ mx: { md: "auto" } }} alignItems="center" gap={4}>
            <Fab
              size="small"
              onClick={() => dispatch(openModal(CreateChatRoomModal.name))}
            >
              <GroupAdd />
            </Fab>
            <Fab size="small" color="primary">
              <Add />
            </Fab>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>D</Avatar>
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </Menu>
          </Stack>
        )}
      </Stack>
    </AppBar>
  );
};
