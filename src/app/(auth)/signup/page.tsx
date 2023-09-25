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
import { SignUpSchema } from "@/vallidations/authSchema";

export default function Page() {
  const { values, errors, touched, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    onSubmit: () => {},
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
          <Typography variant="h4" mb={0.5}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Sign in to your account
          </Typography>

          <Stack gap={3} sx={{ mt: 3 }}>
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.email}
              error={Boolean(errors.email && touched.email)}
            />
            <TextField
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.password}
              error={Boolean(errors.password && touched.password)}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.confirmPassword}
              error={Boolean(errors.confirmPassword && touched.confirmPassword)}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, textTransform: "none" }}
              size="large"
              disableElevation
            >
              Sign Up
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
