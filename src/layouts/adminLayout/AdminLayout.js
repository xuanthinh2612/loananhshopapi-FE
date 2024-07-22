// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React example components
import DashboardLayout from "./DashboardLayout";
import DashboardNavbar from "./DashboardNavbar";
import Footer from "./Footer";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Material Dashboard 2 React routes
import sidenavRoutes from "sidenavRoutes";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import MDBox from "components/shared/MDBox";
import { Icon } from "@mui/material";
import { useState } from "react";

function AdminLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  //   const [rtlCache, setRtlCache] = useState(null);
  //   const { pathname } = useLocation();
  //   Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  //=====================START==================
  return (
    <>
      <Sidenav
        color={sidenavColor}
        brand={
          (transparentSidenav && !darkMode) || whiteSidenav
            ? brandDark
            : brandWhite
        }
        brandName="LoanAnhShop"
        routes={sidenavRoutes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Configurator />
      {configsButton}
      <DashboardLayout>
        {/* <DashboardNavbar /> */}
        <MDBox py={3}>{children}</MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default AdminLayout;
