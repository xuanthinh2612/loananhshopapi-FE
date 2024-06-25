import EnhancedTable from "../EnhancedTable";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "./data/authorsTableData";
import projectsTableData from "./data/projectsTableData";

function ProductManagement(props) {
  // const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const isAuth = isUserLoggedIn();

  useEffect(() => {
    // get product list
    store.dispatch(getListProductByAdminAction());
  }, []);

  console.log(store.getState());
  //   const handleEdit = (studentId) => {
  //     navigate(`/edit-student/${studentId}`);
  //   };

  //   const handleDelete = async (studentId) => {
  //     // await store.dispatch(deleteStudentByIdAction(studentId));
  //   };

  //   if (props.error) {
  //     return (
  //       <div>
  //         Opp! Some error Occured with status: {props.error.response.status} -{" "}
  //         {props.error.message}
  //       </div>
  //     );
  //   }

  //   if (props.isLoading) {
  //     return (
  //       <div className="container">
  //         <div className="text-center">{SpinnerIcon}</div>
  //       </div>
  //     );
  //   }

  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <AdminLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* {props.listProduct && props.listProduct.length > 0 ? (
              <>
                {props.listProduct.map((product) => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>
                        <Link
                          className="text-decoration-none"
                          to={`/product-detail/${product.id}`}
                        >
                          {product.namme}
                        </Link>
                      </td>
                      {isAdmin && <td></td>}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="text-center">
                <td colSpan={7}>No Data To Show.</td>
              </tr>
            )} */}
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
