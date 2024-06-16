// additional lib
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const TruncatedTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  display: "inline-block",
  boxSizing: "border-box",
});

export default TruncatedTypography;
