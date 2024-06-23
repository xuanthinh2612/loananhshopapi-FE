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
import { getListProductAction } from "actions/productActions";
import store from "store";
import { useEffect } from "react";
import { connect } from "react-redux";

// use helper
import { formatter } from "utils/helper";
import configs from "configs";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Card, Typography, CardMedia } from "@mui/material";
import TruncatedTypography from "components/shared/TruncatedTypography";
import MultiLineEllipsis from "components/shared/MultiLineEllipsis";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(getListProductAction());
  }, []);

  return (
    <DefaultLayout>
      <Header>
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
                        route: `/product-detail/${product.id}`,
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
              Hàng chính hãng từ những thương hiệu hàng đầu
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
                        route: `/product-detail/${product.id}`,
                        color: "info",
                        label: "Xem Chi Tiết",
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </MDBox>
        <Grid container spacing={4} mt={5}>
          <Grid item xs={12}>
            <Typography variant="h3" mb={3}>
              Sản phẩm tương tự
            </Typography>
            <Grid container spacing={3}>
              {store.getState().productReducer.list.map((product, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <Link
                    to={`/product-detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                      <CardMedia
                        sx={{ p: 0, m: 0, borderRadius: 0 }}
                        component="img"
                        image={product.avatar.imageUrl}
                        alt={product.name}
                      />
                      <MDBox mt={1} mx={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          textTransform="capitalize"
                        >
                          {product.currentPrice}
                        </MDTypography>
                        <MDBox mb={1}>
                          <TruncatedTypography
                            component={Link}
                            // to={"asdasd"}
                            variant="h5"
                            textTransform="capitalize"
                          >
                            {product.name}
                          </TruncatedTypography>
                        </MDBox>
                        <MDBox mb={3} lineHeight={0}>
                          <MultiLineEllipsis
                            variant="button"
                            fontWeight="light"
                            color="text"
                          >
                            {product.description}
                          </MultiLineEllipsis>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Link>
                  {/* <MDBox display="flex">{renderAuthors}</MDBox> */}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Header>
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
