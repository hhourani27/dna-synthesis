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

  "& td.nucleotide": {
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },

  "& td.nucleotide.synthetized": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },

  "& td.nucleotide.completed": {
    color: theme.palette.success.main,
    fontWeight: 600,
  },
}));

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
              <td
                key={n}
                className={`nucleotide ${
                  oligoIsCompleted[widx]
                    ? "completed"
                    : n < w.synthetizedNucleotideCount
                    ? "synthetized"
                    : ""
                }`}
              >
                {n < w.oligo.length ? w.oligo.charAt(n) : " "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
