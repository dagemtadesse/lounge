"use client";

import { SignUpSchema } from "@/common/vallidations/SignUpSchema";
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  Box,
  Button,
  Grid,
  InputLabel,
  Link as MatLink,
  Stack,
  TextField,
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

            <Stack gap={3} sx={{ mt: 5 }}>
              <Stack gap={2}>
                <InputLabel htmlFor="email-input">Email address</InputLabel>
                <TextField
                  placeholder="Email"
                  id="email-input"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email && touched.email)}
                  helperText={errors.email}
                />
              </Stack>

              <Stack gap={2}>
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <InputLabel htmlFor="password-input">Password</InputLabel>
                  <MatLink
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ ml: "auto" }}
                  >
                    Forgot Password?
                  </MatLink>
                </Stack>
                <TextField
                  placeholder="Password"
                  id="password-input"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.password && touched.password)}
                  helperText={errors.password}
                />
              </Stack>

              <Button
                variant="contained"
                sx={{ mt: 2, textTransform: "none" }}
                size="large"
                type="submit"
                disableElevation
              >
                Sign Up
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={"center"}
              >
                Have an account? <MatLink component={Link} href={ROUTES.SIGN_IN}>Sign In</MatLink>
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
