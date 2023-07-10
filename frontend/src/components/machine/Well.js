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
  thickness = 8,
}) {
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
          color={completedCycles === totalCycles ? "success" : "secondary"}
          thickness={thickness}
          size={size}
          value={(100 * completedCycles) / totalCycles}
          sx={{
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
              transition: (theme) =>
                theme.transitions.create(["stroke-dashoffset", "color"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.shortest,
                }),
            },
          }}
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
