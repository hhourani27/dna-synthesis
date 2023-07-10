import Box from "@mui/material/Box";

export default function SequenceTable({ wellArraySize, wells }) {
  const maxLenghtOligo = Math.max(...wells.map((w) => w.totalCycles));

  return (
    <Box component="table">
      <tbody>
        {wells.map((w) => (
          <tr key={w.id}>
            {[...Array(maxLenghtOligo).keys()].map((n) => (
              <td key={n}>{n < w.oligo.length ? w.oligo.charAt(n) : " "}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  );
}
