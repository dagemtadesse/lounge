"use client";

import { trpc } from "@/app/_trpc/client";
import { usePaginator } from "@/hooks/usePaginator";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal } from "@/store/reducers/modals";
import { Search } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { ContactItem, ContactItemSkeleton } from "./ContactItem";

export const ContactsModal = () => {
  const dispatch = useAppDispatch();

  const modalId = ContactsModal.name;
  const { activeModalId } = useAppSelector((state) => state.app);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog
      open={activeModalId == modalId}
      onClose={onCloseModal}
      fullWidth
      maxWidth="sm"
      sx={{
        boxShadow: 0,
        minHeight: "100%",
        ".MuiDialog-container": { alignItems: "start" },
      }}
      PaperProps={{ elevation: 0 }}
    >
      <ContactList />
    </Dialog>
  );
};

const ContactList = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const sampleContacts = Array(10).fill(0);

  const { data: contacts, fetchNextPage: fetchNextUsers } =
    trpc.users.contacts.useInfiniteQuery(
      { query },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const paginatorRef = usePaginator(() => fetchNextUsers());

  const { mutateAsync: createDM } =
    trpc.chatRoom.createPersonalRoom.useMutation();

  const handleCreateDM = async (user: User) => {
    try {
      const room = await createDM(user.id);
      router.push(`${pathname}?roomId=${room.id}`);
      closeModal();
    } catch (error) {}
  };

  return (
    <>
      <DialogTitle sx={{ pb: 0 }}>Contacts</DialogTitle>
      <Box sx={{ borderBottom: 1, borderColor: "#000" }}>
        <TextField
          fullWidth
          variant="standard"
          sx={{ px: 3, py: 2 }}
          placeholder="Search..."
          margin="none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        {contacts
          ? contacts.pages.map((page, pageIndex) => (
              <Fragment key={"contact-page" + pageIndex}>
                {page.items.map((user, index) => (
                  <ContactItem
                    key={user.id}
                    user={user}
                    onClick={() => {
                      if (user.memberships.length == 0) handleCreateDM(user);
                      else {
                        router.push(
                          `${pathname}?roomId=${user.memberships?.[0].roomId}`
                        );
                        closeModal();
                      }
                    }}
                    paginatorRef={
                      page.items.length == index + 1 &&
                      contacts.pages.length == pageIndex + 1
                        ? paginatorRef
                        : undefined
                    }
                  />
                ))}
              </Fragment>
            ))
          : sampleContacts.map((_, index) => (
              <ContactItemSkeleton key={`contact-item-${index}`} />
            ))}
      </DialogContent>
    </>
  );
};
