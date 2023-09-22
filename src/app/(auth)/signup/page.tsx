"use client";

import { SignUpSchema } from "@/common/vallidations/SignUpSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";
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
import { useFormik } from "formik";
import { ROUTES } from "@/common/routes";

export default function Page() {
  const { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      onSubmit: async (values) => {},
      validationSchema: toFormikValidationSchema(SignUpSchema),
    });

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
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" mb={0.5}>
              Get started
            </Typography>
            <Typography variant="subtitle2" color={"text.secondary"}>
              Create a new account
            </Typography>

            {/* <Divider>or</Divider> */}

            <Stack gap={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 2, textTransform: "none" }}
                startIcon={<GoogleIcon />}
              >
                Sign Up with Google
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={"center"}
              >
                Have an account?{" "}
                <MatLink component={Link} href={ROUTES.SIGN_IN}>
                  Sign In
                </MatLink>
              </Typography>
            </Stack>
          </form>
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
