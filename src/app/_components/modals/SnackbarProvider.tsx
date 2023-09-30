"use client"

import { useAppDispatch, useAppSelector } from "@/store";
import { removeAlert } from "@/store/reducers/modals";
import { Alert, Snackbar } from "@mui/material";

export const SnackbarProvider = () => {
  const dispatch = useAppDispatch();
  const { alert } = useAppSelector((state) => state.app);

  const handleClose = () => dispatch(removeAlert());

  return (
    <Snackbar
      open={Boolean(alert)}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity={alert?.type}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
