import { styled } from "@mui/material/styles";

import PaperMUI from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Paper = styled(PaperMUI)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function Card({ children, isLoading, ...otherProps }) {
  return (
    <Paper elevation={1} {...otherProps}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </Paper>
  );
}
