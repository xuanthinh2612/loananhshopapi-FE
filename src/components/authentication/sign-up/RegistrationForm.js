// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPICall } from "../../../service/authService";
import configs from "../../../configs";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import AuthenticationLayout from "layouts/authenticationLayout/AuthenticationLayout";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(
    "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại."
  );
  const navigate = useNavigate();

  const [agreeTerm, setAgreeTerm] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const now = new Date();

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

  const handleSetAgreeTerm = () => setAgreeTerm(!agreeTerm);

  const handleRegistrationForm = async (e) => {
    e.preventDefault();

    const registerObj = { name, username, email, password };
    const result = await registerAPICall(registerObj);
    if (result.error) {
      setErrorMsg(result.messenger);
      openErrorSB();
    } else {
      navigate(configs.routes.login);
    }
  };

  return (
    <AuthenticationLayout image={bgImage}>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={2}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={0}>
          Đăng Ký Tài Khoản
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={1} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Họ và Tên"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Checkbox onChange={handleSetAgreeTerm} />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Tôi đồng ý với các &nbsp;
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              điều khoản sử dụng
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              disabled={!agreeTerm ? true : false}
              onClick={(e) => handleRegistrationForm(e)}
            >
              Đăng ký
            </MDButton>
          </MDBox>
          {renderErrorSB}
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Bạn đã có tài khoản?
              <MDTypography
                component={Link}
                to="/login"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                &nbsp;Đăng Nhập
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </AuthenticationLayout>
  );
}

export default RegistrationForm;
