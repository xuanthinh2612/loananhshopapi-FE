import Navbar from "./components/Navbar";
import AdminNavbar from "components/admin/AdminNavbar";
import { isAdminUser } from "service/authService";

import DefaultNavbar from "layouts/defaultLayout/components/DefaultNavbar";
import MDBox from "components/shared/MDBox";
import DashboardLayout from "./components/DashboardLayout";
import Footer from "./components/Footer";

function DefaultLayout({ children }) {
  const isAdmin = isAdminUser();

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <DefaultNavbar />}

      <DashboardLayout>
        <MDBox mb={2} />
        {children}
        {/* <Footer /> */}
      </DashboardLayout>
    </>
  );
}

export default DefaultLayout;
