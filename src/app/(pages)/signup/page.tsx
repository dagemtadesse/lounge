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
import { ROUTES } from "@/routes";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { SignUpSchema } from "@/validations/authSchema";
import { trpc } from "@/app/_trpc/client";
import { AuthGuard } from "@/app/_components/AuthGuard";

export default function Page() {
  const register = trpc.auth.register.useMutation();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        submit: null,
      },
      onSubmit: async (values) => {
        await register.mutateAsync(values);
      },
      validationSchema: toFormikValidationSchema(SignUpSchema),
    });

  return (
    <AuthGuard require="loggedOut">
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
              Get Started
            </Typography>
            <Typography variant="subtitle2" color={"text.secondary"}>
              Create your account
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
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                  error={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2, textTransform: "none" }}
                  size="large"
                  disableElevation
                  type="submit"
                >
                  Sign Up
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"center"}
                >
                  Do have an account?{" "}
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
    </AuthGuard>
  );
}
