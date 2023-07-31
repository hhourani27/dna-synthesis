import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import { useNavigate } from "react-router-dom";

import MachineStatus from "./MachineStatusChip";

export default function MachinesTable({ machines }) {
  let navigate = useNavigate();

  return (
    <TableContainer component="div">
      <Table sx={{ minWidth: 650 }} aria-label="machines table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((m) => (
            /* To make the row clickable, I Used this answer from StackOverflow https://stackoverflow.com/a/71600925/471461.
            The disadvantage is that I don't have the same behavior as <a> (mouse hand, righ-click open in new tab).
            I tried to use <Link> (https://stackoverflow.com/a/57155731/471461), but I had validation problems in the console.
            In the future, investigate how to make <Link> work
            */
            <TableRow
              key={m.id}
              hover
              onClick={() => {
                navigate(`/machines/${m.id}`);
              }}
            >
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.model}</TableCell>
              <TableCell>{m.location}</TableCell>
              <TableCell>
                <MachineStatus machine={m} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
