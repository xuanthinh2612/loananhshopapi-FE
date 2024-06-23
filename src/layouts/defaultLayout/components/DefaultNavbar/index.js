/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDInput from "components/shared/MDInput";

// Material Dashboard 2 React example components
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbarContainer,
  navbarRow,
  navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setTransparentNavbar } from "context";

//======================custom import=========
import { home } from "assets/icons";
import { NavLink, useNavigate } from "react-router-dom";

import configs from "configs";

function DefaultNavbar({ absolute = false, light = false, isMini = false }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccountOptions, setOpenAccountOptions] = useState(false);

  useEffect(() => {
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenAccountOptions = (event) =>
    setOpenAccountOptions(event.currentTarget);
  const handleCloseAccountOptions = () => setOpenAccountOptions(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );

  const renderAccountOptions = () => (
    <Menu
      anchorEl={openAccountOptions}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openAccountOptions)}
      onClose={handleCloseAccountOptions}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Thông tin cá nhân" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        to={configs.routes.home}
        title="Đăng Nhập"
      />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Tài khoản" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar position="relative" color="inherit">
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
            p: 3,
            position: "relative",
            [breakpoints.up("xl")]: {
              marginLeft: miniSidenav ? pxToRem(120) : pxToRem(120),
              marginRight: miniSidenav ? pxToRem(120) : pxToRem(120),
              transition: transitions.create(["margin-left", "margin-right"], {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.standard,
              }),
            },
          })}
        >
          <MDBox lineHeight={1.25}>
            <NavLink to={configs.routes.home}>
              <IconButton sx={navbarIconButton} size="small" disableRipple>
                {home}
              </IconButton>
            </NavLink>
            <NavLink to={configs.routes.home}>
              <IconButton sx={navbarIconButton} size="small" disableRipple>
                LoanAnh Shop
              </IconButton>
            </NavLink>
            <NavLink to={configs.routes.login}>
              <IconButton sx={navbarIconButton} size="small" disableRipple>
                Blog
              </IconButton>
            </NavLink>
            <NavLink to={configs.routes.aboutUs}>
              <IconButton sx={navbarIconButton} size="small" disableRipple>
                Giới thiệu
              </IconButton>
            </NavLink>
          </MDBox>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Tìm kiếm" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenAccountOptions}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {renderAccountOptions()}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
              >
                <Icon sx={iconsStyle}>shopping_cart</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Typechecking props for the DashboardNavbar
DefaultNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DefaultNavbar;
