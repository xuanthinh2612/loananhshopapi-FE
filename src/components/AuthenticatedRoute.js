import configs from "configs";
import { Navigate } from "react-router-dom";

const { isUserLoggedIn } = require("service/authService");

function AuthenticatedRoute({ route, children }) {
  const isAuth = isUserLoggedIn();
  if (route.notRequireAuth || isAuth) {
    return children;
  }
  return <Navigate to={configs.routes.login} />;
}

export default AuthenticatedRoute;
