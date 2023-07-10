import Box from "@mui/material/Box";

export default function SequenceTable({ wellArraySize, wells }) {
  return (
    <Box
      component="table"
      sx={{
        overflow: "hidden",
      }}
    >
      <tbody>
        {wells.map((w) => (
          <tr key={w.id}>
            <td>{w.oligo}</td>
          </tr>
        ))}
      </tbody>
    </Box>
  );
}
