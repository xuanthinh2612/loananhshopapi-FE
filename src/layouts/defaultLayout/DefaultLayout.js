import DefaultNavbar from "layouts/defaultLayout/components/DefaultNavbar";
import MDBox from "components/shared/MDBox";
import DashboardLayout from "./components/DashboardLayout";
import Footer from "./components/Footer";

function DefaultLayout({ children }) {
  return (
    <>
      <DefaultNavbar />
      <DashboardLayout>
        {children}
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default DefaultLayout;
