"use client";

import { Box, Slide, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { ContactSkeleton } from "./Contacttem";

function a11yProps(index: number) {
  return {
    id: `contact-tab-${index}`,
    "aria-controls": `contact-tabpanel-${index}`,
  };
}

export const Contacts = () => {
  const [value, setValue] = useState(0);
  const contacts = Array(25).fill(5);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack gap={2}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          bgcolor: "background.default",
          zIndex: 100,
          px: 1.5
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<Typography variant="subtitle2">Direct messages</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography variant="subtitle2">Chat rooms</Typography>}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <Slide direction="left" in={value == 1} mountOnEnter unmountOnExit>
        <Stack px={1.5}>
          {contacts.map((contact, index) => (
            <ContactSkeleton key={`contact-` + index} />
          ))}
        </Stack>
      </Slide>
    </Stack>
  );
};
