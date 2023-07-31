import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import ConnectionStatus from "../ConnectionStatus";

const Header = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,

  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: theme.spacing(3),

  backgroundColor: theme.palette.background.default,
  height: theme.layout.header.height,
  padding: theme.spacing(3),
  zIndex: theme.zIndex.appBar,
}));

export default function TopBar({ webSocketConnectionStatus }) {
  return (
    <Header>
      <ConnectionStatus webSocketConnectionStatus={webSocketConnectionStatus} />
      <IconButton size="large" aria-label="notifications">
        <NotificationsNoneOutlinedIcon />
      </IconButton>
      <Avatar alt="My Profile" src="https://placedog.net/300/300" />
    </Header>
  );
}
