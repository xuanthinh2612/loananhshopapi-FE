import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  login,
  storeToken,
  saveLoggedInUser,
  loginBySNS,
} from "../service/authService";
import configs from "../configs";
import Button from "@mui/material/Button";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css"; // Import FirebaseUI CSS

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // for example only using firebaseui
  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize FirebaseUI
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: false, // URL to redirect to after sign-in.
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
            saveLoggedInUser(username, role);
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
  //
  //

  async function handleLoginForm(e) {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response);
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
      console.error("handleLoginForm: ", error);
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> Login Form </h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    {" "}
                    Username or Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Password </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <Button
                    variant="contained"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Login
                  </Button>
                </div>
                <div id="firebaseui-auth-container"></div>
                <div className="form-group mb-3">
                  <Link
                    to={configs.routes.registration}
                    className="text-decoration-none"
                  >
                    Do not have account? Regiter Now!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
