"use client";

import { ROUTES } from "@/common/routes";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Grid,
  Link as MatLink,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

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
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "384px" },
            mx: "auto",
          }}
        >
          <Typography variant="h4" mb={0.5}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Sign in to your account
          </Typography>

          {/* <Divider>or</Divider> */}

          <Stack gap={3} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{ mt: 2, textTransform: "none" }}
              size="large"
              disableElevation
              startIcon={<GoogleIcon/>}
            >
              Sign In with Google
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"center"}
            >
              Don&apos;t have an account?{" "}
              <MatLink component={Link} href={ROUTES.SIGN_UP}>
                Sign Up Now
              </MatLink>
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "25%",
          p: 3,
        }}
      ></Box>
    </Grid>
  );
}
