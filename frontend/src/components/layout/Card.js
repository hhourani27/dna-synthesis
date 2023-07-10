import { styled } from "@mui/material/styles";

import PaperMUI from "@mui/material/Paper";

const Paper = styled(PaperMUI)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function Card({ children, ...otherProps }) {
  return (
    <Paper elevation={1} {...otherProps}>
      {children}
    </Paper>
  );
}
