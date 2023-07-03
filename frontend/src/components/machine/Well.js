import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Well({
  status = "IDLE",
  completedCycles = 0,
  totalCycles = 0,
  idle = false,
}) {
  const thickness = 4;

  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        thickness={thickness}
        value={100}
      />
      {!idle && (
        <CircularProgress
          variant="determinate"
          sx={{
            color: status === "COMPLETED_OLIGO" ? "#66bb6a" : "#1a90ff",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          thickness={thickness}
          value={(100 * completedCycles) / totalCycles}
        />
      )}
    </Box>
  );
}
