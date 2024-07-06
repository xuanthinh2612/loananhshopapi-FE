import { Link } from "react-router-dom";
import configs from "../../configs";
import AdminLayout from "layouts/adminLayout";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Trang Quản Lý</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">Quản lý chung</li>
          <li className="breadcrumb-item active">Quản lý chung</li>
        </ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Quản lý sản phẩm</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={configs.routes.productListMng}
                >
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Phân Loại Hàng</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={configs.routes.categories}
                >
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Cài Đặt Ảnh Bìa</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link">
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">Hỏi đáp khách hàng</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link">
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">Quản lý đơn hàng</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link">
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Blog</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link">
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-info text-white mb-4">
              <div className="card-body">Danh Sách User</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={configs.routes.userManagement}
                >
                  Chi Tiết
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
