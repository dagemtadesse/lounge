import { Skeleton, Stack, SxProps } from "@mui/material";

export const Bubble = () => {
  return <></>;
};

export const BubbleSkeleton = ({ fromOthers }: { fromOthers?: boolean }) => {
  const messages = 2;

  const borderRadius: SxProps = { borderRadius: 6 };

  if (fromOthers) borderRadius.borderBottomLeftRadius = 8;
  else borderRadius.borderBottomRightRadius = 8;

  return (
    <Stack
      direction="row"
      gap={2}
      justifyContent={fromOthers ? "start" : "end"}
    >
      {fromOthers && (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ alignSelf: "end" }}
        />
      )}
      <Stack
        sx={{ width: "100%", maxWidth: "50%" }}
        gap={1}
        alignItems={fromOthers ? "start" : "end"}
      >
        {Array(messages)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              variant="rounded"
              width={index % 2 == 0 ? "60%" : "80%"}
              height={40}
              key={"message-bubble" + index}
              sx={borderRadius}
            />
          ))}
      </Stack>
    </Stack>
  );
};
