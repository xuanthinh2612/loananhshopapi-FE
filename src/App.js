import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout } from "./Layout";
import routes from "./routes";
import { isUserLoggedIn } from "./service/authService";
import configs from "./configs";

function App() {
  function AuthenticatedRoute({ route, children }) {
    const isAuth = isUserLoggedIn();

    if (route.notRequireAuth || isAuth) {
      return children;
    }

    return <Navigate to={configs.routes.login} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <AuthenticatedRoute route={route}>
                    <Page />
                  </AuthenticatedRoute>
                </DefaultLayout>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
