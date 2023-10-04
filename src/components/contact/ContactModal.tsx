"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal } from "@/store/reducers/modals";
import { Search } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import { ContactItemSkeleton } from "./ContactItem";

export const ContactsModal = () => {
  const dispatch = useAppDispatch();

  const modalId = ContactsModal.name;
  const { activeModalId } = useAppSelector((state) => state.app);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  const sampleContacts = Array(10).fill(0);

  return (
    <Dialog
      open={activeModalId == modalId}
      onClose={onCloseModal}
      fullWidth
      maxWidth="sm"
      sx={{ boxShadow: 0 }}
      PaperProps={{ elevation: 0 }}
    >
      <DialogTitle sx={{ pb: 0 }}>Contacts</DialogTitle>
      <Box sx={{ borderBottom: 1, borderColor: "#000" }}>
        <TextField
          fullWidth
          variant="standard"
          sx={{ px: 3, py: 2 }}
          placeholder="Search..."
          margin="none"
          InputProps={{
            startAdornment: (
              <Box sx={{ pr: 1.5, display: "grid", placeItems: "center" }}>
                <Search color="inherit" />
              </Box>
            ),
            disableUnderline: true,
          }}
        />
      </Box>
      <DialogContent sx={{ p: 0 }}>
        {sampleContacts.map((_, index) => (
          <ContactItemSkeleton key={`contact-item-${index}`} />
        ))}
      </DialogContent>
    </Dialog>
  );
};
