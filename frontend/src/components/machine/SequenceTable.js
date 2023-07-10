import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Nucleotide = styled("td")(({ theme, n, synthetized }) => ({
  color: synthetized
    ? theme.palette.success.main
    : theme.palette.text.secondary,
  fontWeight: synthetized ? 600 : 400,
}));

export default function SequenceTable({ wellArraySize, wells }) {
  const maxLenghtOligo = Math.max(...wells.map((w) => w.totalCycles));

  return (
    <Box
      component="table"
      // sx={{
      //   border: "1px solid",
      //   "& td": {
      //     border: "1px solid",
      //   },
      // }}
    >
      <tbody>
        {wells.map((w) => (
          <tr key={w.id}>
            {[...Array(maxLenghtOligo).keys()].map((n) => (
              <Nucleotide
                key={n}
                synthetized={n < w.synthetizedNucleotideCount}
              >
                {n < w.oligo.length ? w.oligo.charAt(n) : " "}
              </Nucleotide>
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  );
}
