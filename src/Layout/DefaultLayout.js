import Navbar from "../components/Navbar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { isAdminUser } from "../service/authService";

function DefaultLayout({ children }) {
  const isAdmin = isAdminUser();

  if (isAdmin) {
    return (
      <>
        <AdminNavbar />
        <div className="container min-vh-100">{children}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container min-vh-100">{children}</div>
      <footer className="footer py-3 bg-light">
        <div className="container d-flex justify-content-center">
          <span className="text-muted">
            &copy; {new Date().getFullYear()} Student Management System.
          </span>
        </div>
      </footer>
    </>
  );
}

export default DefaultLayout;
