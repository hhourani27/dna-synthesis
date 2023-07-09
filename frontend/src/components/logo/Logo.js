import { styled } from "@mui/material/styles";

import dnaLogo from "./dna-logo.svg";

const LogoAndText = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  flexWrap: "nowrap",
}));

const BlackLogo = styled("img")(({ theme }) => ({
  filter: "invert(1)",
}));

const LogoText = styled("span")(({ theme }) => ({
  whiteSpace: "nowrap",
}));

export default function Logo({ open }) {
  return (
    <LogoAndText>
      <BlackLogo src={dnaLogo} alt="Logo" width="40" />
      {open && <LogoText>DNA SYNTHESIS</LogoText>}
    </LogoAndText>
  );
}
