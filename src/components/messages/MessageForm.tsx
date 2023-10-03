import { useFormik } from "formik";
import { IconButton, Stack, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Room } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";

export const MessageForm = ({ room }: { room: Room }) => {
  const { mutateAsync } = trpc.messages.create.useMutation();

  const { handleChange, handleSubmit, handleReset, values } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync({ roomId: room!.id, content: values.message });
        resetForm();
      } catch (err) {}
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={2} sx={{ px: 3, py: 1 }} alignItems="end">
        <TextField
          fullWidth
          multiline
          margin="none"
          placeholder="Write a message..."
          size="small"
          name={"message"}
          onChange={handleChange}
          value={values.message}
        />
        <IconButton type="submit">
          <SendRoundedIcon color="primary" />
        </IconButton>
      </Stack>
    </form>
  );
};
