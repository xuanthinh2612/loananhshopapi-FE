// additional lib
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const MultiLineEllipsis = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 3,
  lineHeight: "1.5",
  minHeight: "4.5em", // Adjust based on the line height to ensure space for 3 lines
  textTransform: "none", // Prevent text from being transformed to uppercase
});

export default MultiLineEllipsis;
