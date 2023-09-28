"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Logo } from "../_icons/logo";
import { ROUTES } from "@/routes";
import Link from "next/link";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useSession();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      sx={{
        height: { sx: "auto", md: "100vh" },
        width: "auto",
        left: 0,
        right: "auto",
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
          <Box sx={{ mx: { md: "auto" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
          </Box>
        )}
      </Stack>
    </AppBar>
  );
};
