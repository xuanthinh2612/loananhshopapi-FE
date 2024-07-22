// additional lib
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const TruncatedTypography = styled(Typography)({
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 2,
  lineHeight: "1",
  minHeight: "2rem", // Adjust based on the line height to ensure space for 3 lines
  textTransform: "none", // Prevent text from being transformed to uppercase
  fontWeight: "bold", // Make text bold
});

export default TruncatedTypography;
