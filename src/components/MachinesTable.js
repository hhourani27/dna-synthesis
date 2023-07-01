import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

export default function MachinesTable({ machines }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="machines table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.model}</TableCell>
              <TableCell>{m.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
