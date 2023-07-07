import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";

export default function Logo({ open }) {
  return (
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
        color: "primary.contrastText",
      }}
    >
      <BiotechOutlinedIcon />
      <ListItemText primary={"DNA SYNTHESIS"} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemIcon>
  );
}
