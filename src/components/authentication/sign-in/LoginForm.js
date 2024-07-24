import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  login,
  storeToken,
  saveLoggedInUser,
  loginBySNS,
} from "../../../service/authService";
import configs from "../../../configs";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css"; // Import FirebaseUI CSS

import * as firebaseService from "service/firebaseService";

//===============================================================
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDTypography from "components/shared/MDTypography";
import MDInput from "components/shared/MDInput";
import MDButton from "components/shared/MDButton";
import MDSnackbar from "components/shared/MDSnackbar";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import AuthenticationLayout from "layouts/authenticationLayout/AuthenticationLayout";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(
    "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại."
  );
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const now = new Date();
  const navigate = useNavigate();
  // Error alert

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content={errorMsg}
      dateTime={`${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  // for example only using firebaseui
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseService.firebaseConfig);
    }

    // Initialize FirebaseUI
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/", // URL to redirect to after sign-in.
      signInOptions: [
        // List of authentication providers.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // Add more providers as needed.
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: async (result) => {
          const userInfo = result.user.providerData[0];

          const userDto = {
            name: userInfo.displayName,
            provider: userInfo.providerId,
            photoUrl: userInfo.photoURL,
            usernameOrEmail: userInfo.email,
          };

          const response = await loginBySNS(userDto);
          if (response) {
            const token = "Bearer " + response.accessToken;
            const role = response.role;
            storeToken(token);
            saveLoggedInUser(userInfo.email, role);
            if (role === "ROLE_ADMIN") {
              navigate(configs.routes.adminDashboard);
            } else {
              navigate(configs.routes.home);
            }
          }
        },
      },
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    // Render FirebaseUI widget
    ui.start("#firebaseui-auth-container", uiConfig);

    // Clean up on unmount
    return () => {
      ui.delete();
    };
  }, []);

  async function handleLoginForm(e) {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response) {
        const token = "Bearer " + response.accessToken;
        const role = response.role;
        storeToken(token);
        saveLoggedInUser(username, role);
        if (role === "ROLE_ADMIN") {
          navigate(configs.routes.adminDashboard);
        } else {
          navigate(configs.routes.home);
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
      openErrorSB();
      console.error(error);
    }
  }

  return (
    <AuthenticationLayout image={bgImage}>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              name="username"
              type="email"
              label="Username or Email"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              fullWidth
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={(e) => handleLoginForm(e)}
            >
              &nbsp;Đăng Nhập
            </MDButton>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <div id="firebaseui-auth-container"></div>
          </MDBox>

          {renderErrorSB}
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Bạn chưa có tài khoản?
              <MDTypography
                component={Link}
                to={configs.routes.registration}
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                &nbsp;Đăng ký
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </AuthenticationLayout>
  );
}

export default LoginForm;
