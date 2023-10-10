"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

type ConfirmData = {
  title: string;
  description: string;
  actionName?: string;
  callback: () => void;
};

export const confirmationContext = createContext({
  data: undefined as ConfirmData | undefined,
  handleClose: () => {},
  openModal: (data: ConfirmData) => {},
});

export const ConfirmationModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<ConfirmData | undefined>(undefined);

  return (
    <confirmationContext.Provider
      value={{
        data,
        handleClose: () => setData(undefined),
        openModal: (data) => setData(data),
      }}
    >
      {children}
      <ConfirmationModal />
    </confirmationContext.Provider>
  );
};

export const ConfirmationModal = ({}: {}) => {
  const confirmationCtx = useContext(confirmationContext);
  const data = confirmationCtx.data;

  const handleClose = () => {
    confirmationCtx.handleClose();
  };

  return (
    <Dialog
      open={!!confirmationCtx.data}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ elevation: 0 }}
    >
      <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description" color="white">
          <Typography variant="body2">{data?.description}</Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            data?.callback?.();
            handleClose();
          }}
          autoFocus
          variant="contained"
          color="error"
        >
          {data?.actionName || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
