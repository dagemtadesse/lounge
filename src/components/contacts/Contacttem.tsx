import { MoreVertOutlined } from "@mui/icons-material";
import { Card, CardHeader, Avatar, IconButton, Skeleton } from "@mui/material";
import { red } from "@mui/material/colors";

export const Contact = () => {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        p: 0,
        boxShadow: 0,
      }}
    >
      <CardHeader
        sx={{ px: 0, alignItems: "center", bgcolor: "transparent" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertOutlined sx={{ color: "grey.400" }} fontSize={"small"} />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      ></CardHeader>
    </Card>
  );
};

export const ContactSkeleton = () => {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        p: 0,
        boxShadow: 0,
      }}
    >
      <CardHeader
        sx={{ px: 0, alignItems: "center", bgcolor: "transparent" }}
        avatar={
          <Skeleton variant="circular" sx={{ width: "40px", height: "40px" }} />
        }
        title={
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} />
        }
        subheader={
          <Skeleton variant="text" sx={{ fontSize: "0.75rem", width: "50%" }} />
        }
      ></CardHeader>
    </Card>
  );
};
