import { styled } from "@mui/material/styles";

import dnaLogo from "./dna-logo.svg";

const LogoAndText = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const BlackLogo = styled("img")(({ theme }) => ({
  filter: "invert(1)",
}));

export default function Logo({ open }) {
  return (
    <LogoAndText>
      <BlackLogo src={dnaLogo} alt="Logo" width="40" />
      <div>DNA SYNTHESIS</div>
    </LogoAndText>
  );
}
