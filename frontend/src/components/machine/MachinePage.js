import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PaperMUI from "@mui/material/Paper";

import WellArray from "./WellArray";
import { CircularProgress } from "@mui/material";

const Paper = styled(PaperMUI)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MachinePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/machines/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`Fetched Machine ${data.id}`);
        setMachine(data);
        setIsLoading(false);
      });
  }, []);

  const [rowSize, colSize] = [8, 12];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper elevation={1}>
        <h2>Machine card {id}</h2>
      </Paper>
      <Paper elevation={1}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <WellArray
            rowSize={rowSize}
            colSize={colSize}
            wells={machine.wells}
          />
        )}
      </Paper>
    </Box>
  );
}
