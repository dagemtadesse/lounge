"use client";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Page() {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          p: 3,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box sx={{ width: "384px", mx: "auto" }}>
          <Typography variant="h3" mb={0.5}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Sign in to your account
          </Typography>

          {/* <Divider>or</Divider> */}

          <Stack gap={3} sx={{ mt: 5 }}>
            <Stack gap={2}>
              <InputLabel htmlFor="email-input">Email address</InputLabel>
              <TextField placeholder="Email" id="email-input" />
            </Stack>

            <Stack gap={2}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
              >
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Link
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ ml: "auto" }}
                >
                  Forgot Password?
                </Link>
              </Stack>
              <TextField placeholder="Password" id="password-input" />
            </Stack>

            <Button
              variant="contained"
              sx={{ mt: 2, textTransform: "none" }}
              size="large"
              disableElevation
            >
              Login
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"center"}
            >
              Don&apos;t have an account? <Link>Sign Up Now</Link>
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "25%",
          p: 3,
        }}
      ></Box>
    </Grid>
  );
}
