import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Well from "./Well";

const Nucleotide = styled("td")(
  ({ theme, n, nucleotideIsSynthetized, oligoIsCompleted = false }) => ({
    color: oligoIsCompleted
      ? theme.palette.success.main
      : nucleotideIsSynthetized
      ? theme.palette.secondary.main
      : theme.palette.text.secondary,
    fontWeight: nucleotideIsSynthetized ? 600 : 400,
  })
);

export default function SequenceTable({ wellArraySize, wells }) {
  const maxLenghtOligo = Math.max(...wells.map((w) => w.totalCycles));
  const oligoIsCompleted = wells.map(
    (w) => w.synthetizedNucleotideCount === w.totalCycles
  );

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
        {wells.map((w, widx) => (
          <tr key={w.id}>
            <td>
              {w.status === "IDLE" ? (
                <Well idle />
              ) : (
                <Well
                  status={w.status}
                  completedCycles={w.synthetizedNucleotideCount}
                  totalCycles={w.totalCycles}
                />
              )}
            </td>
            {[...Array(maxLenghtOligo).keys()].map((n) => (
              <Nucleotide
                key={n}
                nucleotideIsSynthetized={n < w.synthetizedNucleotideCount}
                oligoIsCompleted={oligoIsCompleted[widx]}
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
