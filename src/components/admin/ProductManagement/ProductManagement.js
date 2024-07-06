import EnhancedTable from "../EnhancedTable";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { pencel, trash, plus } from "assets/icons";
import configs from "configs";
// import ConfirmModal from "./ConfirmModal";
import store from "store";

// // import { connect } from "react-redux";
import {
  cleanUpSessionAndStorageData,
  isAdminUser,
  isUserLoggedIn,
} from "service/authService";
import SpinnerIcon from "components/SpinnerIcon";

import AdminLayout from "layouts/adminLayout";
import { getListProductByAdminAction } from "actions/productActions";
import { connect } from "react-redux";
import MDBox from "components/shared/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/shared/MDTypography";
import AddIcon from "@mui/icons-material/Add";

// Data
import MDButton from "components/shared/MDButton";
import ProductTableData from "./data/ProductTableData";

function ProductManagement(props) {
  const [updateFlg, setUpdateFlg] = useState(false);

  const isAdmin = isAdminUser();
  const isAuth = isUserLoggedIn();

  useEffect(() => {
    // get product list
    store.dispatch(getListProductByAdminAction());
    setUpdateFlg(false);
  }, [updateFlg]);

  if (props.error) {
    return (
      <div>
        Ôi! Đã có lỗi xảy ra. status: {props.error.response.status} -
        {props.error.message}
      </div>
    );
  }

  return (
    <AdminLayout>
      <Grid item xs={12}>
        <Link to={configs.routes.newProduct}>
          <MDButton
            variant="contained"
            color="info"
            startIcon={<AddIcon />}
            style={{ marginBottom: "20px" }}
          >
            Thêm Mới
          </MDButton>
        </Link>

        <Card>
          <MDBox
            mx={0}
            mt={0}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Danh Sách Sản Phẩm&nbsp;
            </MDTypography>
          </MDBox>

          {props.isLoading ? (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={3}
            >
              {SpinnerIcon}
            </MDBox>
          ) : (
            <MDBox pt={3}>
              <ProductTableData
                callback={setUpdateFlg}
                productList={props.listProduct}
              />
            </MDBox>
          )}
        </Card>
      </Grid>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    listProduct: state.productReducer.list,
    isLoading: state.productReducer.isLoading,
    error: state.productReducer.error,
  };
};

export default connect(mapStateToProps)(ProductManagement);
