import Navbar from "./components/Navbar";
// import AdminNavbar from "components/admin/AdminNavbar";
// import { isAdminUser } from "service/authService";

import DefaultNavbar from "layouts/defaultLayout/components/DefaultNavbar";
import MDBox from "components/shared/MDBox";
import DashboardLayout from "./components/DashboardLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";

function DefaultLayout({ children }) {
  // const isAdmin = isAdminUser();

  // if (isAdmin) {
  //   return (
  //     <>
  //       <AdminNavbar />
  //       {children}
  //     </>
  //   );
  // }
  //=======================================START========================

  return (
    <>
      {/* <Navbar /> */}
      <DefaultNavbar />
      <DashboardLayout>
        <MDBox mb={2} />
        <Header>{children}</Header>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default DefaultLayout;
