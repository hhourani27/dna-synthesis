import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Well({
  idle = false,
  completedCycles = 0,
  totalCycles = 0,
  displayCount = false,
  size = 40,
}) {
  const thickness = 8;

  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        thickness={thickness}
        size={size}
        value={100}
      />
      {!idle && (
        <CircularProgress
          variant="determinate"
          sx={{
            color: completedCycles === totalCycles ? "#66bb6a" : "#1a90ff",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          thickness={thickness}
          size={size}
          value={(100 * completedCycles) / totalCycles}
        />
      )}
      {displayCount && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            align="center"
          >
            <span>{`${completedCycles} / ${totalCycles}`}</span>
            <br />
            <span>cycles</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
