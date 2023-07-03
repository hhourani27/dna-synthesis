import { Fragment } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PaperMUI from "@mui/material/Paper";

import { useParams } from "react-router-dom";

import WellArray from "./WellArray";

const Paper = styled(PaperMUI)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MachinePage() {
  const { id } = useParams();

  const [rowSize, colSize] = [8, 12];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper elevation={1}>
        <h2>Machine card {id}</h2>
      </Paper>
      <Paper elevation={1}>
        <WellArray rowSize={rowSize} colSize={colSize} />
      </Paper>
    </Box>
  );
}
