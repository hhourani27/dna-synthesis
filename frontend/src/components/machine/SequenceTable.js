import { styled } from "@mui/material/styles";
import Well from "./Well";

const Table = styled("table")(({ theme }) => ({
  "& td, & th": {
    padding: `${theme.spacing(1)} 0`,
    textAlign: "center",
  },

  "& th": {
    paddingRight: theme.spacing(2),
  },
}));

const Nucleotide = styled("td")(
  ({ theme, nucleotideIsSynthetized, oligoIsCompleted = false }) => ({
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
    <Table>
      <tbody>
        {wells.map((w, widx) => (
          <tr key={w.id}>
            <th>
              {w.status === "IDLE" ? (
                <Well idle />
              ) : (
                <Well
                  status={w.status}
                  completedCycles={w.synthetizedNucleotideCount}
                  totalCycles={w.totalCycles}
                />
              )}
            </th>
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
    </Table>
  );
}
