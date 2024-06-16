/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDTypography from "components/shared/MDTypography";

// Material Dashboard 2 React example components
import DefaultProjectCard from "components/shared/DefaultProductCard";

// defaultLayout
import DefaultLayout from "layouts/defaultLayout";

// use for reducer
import { getListProductAction } from "actions/productAction";
import store from "store";
import { useEffect } from "react";
import { connect } from "react-redux";

// use helper
import { formatter } from "utils/helper";

function Home(props) {
  useEffect(() => {
    store.dispatch(getListProductAction());
  }, []);

  return (
    <DefaultLayout>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          Mỹ Phẩm
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography variant="button" color="text">
            Architects design houses
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={2} p={2}>
        <Grid container spacing={6}>
          {props.listProduct &&
            props.listProduct.map((product) => {
              return (
                <Grid item xs={6} md={6} xl={3}>
                  <DefaultProjectCard
                    image={product.avatar.imageUrl}
                    label={formatter.format(product.currentPrice)}
                    title={product.name}
                    description={product.description}
                    action={{
                      type: "internal",
                      route: `/api/product/show/${product.id}`,
                      color: "info",
                      label: "Xem Chi Tiết",
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </MDBox>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          Thực phẩm chức năng
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography variant="button" color="text">
            Architects design houses
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={2} p={2}>
        <Grid container spacing={6}>
          {props.listProduct &&
            props.listProduct.map((product) => {
              return (
                <Grid item xs={6} md={6} xl={3}>
                  <DefaultProjectCard
                    image={product.avatar.imageUrl}
                    label={formatter.format(product.currentPrice)}
                    title={product.name}
                    description={product.description}
                    action={{
                      type: "internal",
                      route: `/api/product/show/${product.id}`,
                      color: "info",
                      label: "Xem Chi Tiết",
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </MDBox>
    </DefaultLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    listProduct: state.productReducer.list,
    isLoading: state.productReducer.isLoading,
    error: state.productReducer.error,
  };
};

export default connect(mapStateToProps)(Home);
