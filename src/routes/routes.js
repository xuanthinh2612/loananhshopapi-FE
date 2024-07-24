import configs from "configs";
import StudentList from "components/StudentList";
import Home from "components/home";
import ClassList from "components/ClassList";
import StudentEditForm from "components/StudentEditFrom";
import StudentDetail from "components/StudentDetail";
import NewStudentForm from "components/NewStudentFrom";
import NewClassForm from "components/NewClassForm";
import EditClassForm from "components/EditClassForm";
import ClassDetailForm from "components/ClassDetailForm";
import LoginForm from "components/authentication/sign-in";
import RegistrationForm from "components/authentication/sign-up/RegistrationForm";
import Dashboard from "components/admin/Dashboard";

import ProductDetail from "components/productDetail";
import OrderPage from "components/OderPage";
import AboutPage from "components/AboutPage/AboutPage";
import ProductManagement from "components/admin/ProductManagement";
import NewProductPage from "components/admin/NewProductPage";
import EditProductPage from "components/admin/EditProductPage/EditProductPage";
import NewCategoryPage from "components/admin/NewCategoryPage";
import UserManagementPage from "components/admin/UserManagementPage";
import CategoryListPage from "components/admin/CategoryListPage";
import EditCategoryPage from "components/admin/EditCategoryPage/EditCategoryPage";
import BlogManagement from "components/admin/BlogManagement/BlogManagement";
import Blogs from "components/Blogs/Blogs";
import BlogDetails from "components/BlogDetails";
import BlogNewPage from "components/admin/BlogNewPage";
import BlogEditPage from "components/admin/BlogEditPage";

const routes = [
  {
    path: configs.routes.productDetail,
    element: ProductDetail,
    notRequireAuth: true,
  },

  { path: configs.routes.aboutUs, element: AboutPage, notRequireAuth: true },
  { path: configs.routes.orders, element: OrderPage, notRequireAuth: true },
  { path: configs.routes.newProduct, element: NewProductPage },
  { path: configs.routes.editProduct, element: EditProductPage },
  { path: configs.routes.productListMng, element: ProductManagement },
  { path: configs.routes.adminDashboard, element: Dashboard },
  { path: configs.routes.home, element: Home, notRequireAuth: true },
  { path: configs.routes.studentList, element: StudentList },
  { path: configs.routes.classList, element: ClassList },
  { path: configs.routes.classDetail, element: ClassDetailForm },
  { path: configs.routes.studentDetail, element: StudentDetail },
  { path: configs.routes.newStudent, element: NewStudentForm },
  { path: configs.routes.newClass, element: NewClassForm },
  { path: configs.routes.editStudent, element: StudentEditForm },
  { path: configs.routes.editClass, element: EditClassForm },
  { path: configs.routes.login, element: LoginForm, notRequireAuth: true },
  {
    path: configs.routes.registration,
    element: RegistrationForm,
    notRequireAuth: true,
  },
  { path: configs.routes.newCategory, element: NewCategoryPage },
  { path: configs.routes.categories, element: CategoryListPage },
  { path: configs.routes.categoryEdit, element: EditCategoryPage },

  { path: configs.routes.userManagement, element: UserManagementPage },
  {
    path: configs.routes.blogsManagement,
    element: BlogManagement,
  },
  { path: configs.routes.blogs, element: Blogs, notRequireAuth: true },
  {
    path: configs.routes.blogDetails,
    element: BlogDetails,
    notRequireAuth: true,
  },
  { path: configs.routes.newBlog, element: BlogNewPage },
  { path: configs.routes.editBlog, element: BlogEditPage },
];

export default routes;
