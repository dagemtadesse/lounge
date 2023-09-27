"use client";

import {
  Box,
  Button,
  Grid,
  Link as MatLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/routes";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LoginSchema } from "@/validations/authSchema";

export default function Page() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        submit: null,
      },
      onSubmit: async (values) => {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: `${window.location.origin || ROUTES.HOME}`,
        });
      },
      validationSchema: toFormikValidationSchema(LoginSchema),
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
          <Typography variant="h4" mb={0.5}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Sign in to your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack gap={3} sx={{ mt: 3 }}>
              <TextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : undefined}
                error={Boolean(errors.email && touched.email)}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : undefined}
                error={Boolean(errors.password && touched.password)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2, textTransform: "none" }}
                size="large"
                disableElevation
                type="submit"
              >
                Sign In
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
