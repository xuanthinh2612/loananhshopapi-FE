import React from "react";

//===============================================================
// @mui material components
import Card from "@mui/material/Card";

// Authentication layout components
import BasicLayout from "./components/BasicLayout";

function AuthenticationLayout({ image, children }) {
  return (
    <BasicLayout image={image}>
      <Card>{children}</Card>
    </BasicLayout>
  );
}

export default AuthenticationLayout;
