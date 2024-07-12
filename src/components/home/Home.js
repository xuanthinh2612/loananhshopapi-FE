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
import { useEffect, useState } from "react";
import { connect } from "react-redux";

// use helper
import { formatter } from "utils/helper";
import configs from "configs";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Card, Typography, CardMedia, Divider } from "@mui/material";
import TruncatedTypography from "components/shared/TruncatedTypography";
import MultiLineEllipsis from "components/shared/MultiLineEllipsis";
import MDInput from "components/shared/MDInput";

function Home(props) {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [normalPros, setNormalPros] = useState([]);
  const [secondHandPros, setSecondHandPros] = useState([]);

  const fetchNewProduct = async () => {
    await store.dispatch(getListProductAction());
    setNewProducts(store.getState().productReducer.list);
  };

  const fetchNormalPro = async () => {
    await store.dispatch(getListProductAction());
    setNewProducts(store.getState().productReducer.list);
  };

  const fetchSecondHandPro = async () => {
    await store.dispatch(getListProductAction());
    setNewProducts(store.getState().productReducer.list);
  };

  useEffect(() => {
    fetchNewProduct();
  }, []);

  return (
    <DefaultLayout>
      <Header />
      <MDBox pt={2} lineHeight={1.25}>
        <MDTypography variant="h5" fontWeight="medium">
          Sản phẩm mới về
        </MDTypography>
        <MDBox mb={1}>
          <MDBox pr={1} mx={0} size="small">
            <MDInput label="Tìm kiếm" />
          </MDBox>
        </MDBox>
        <Divider />
      </MDBox>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {newProducts &&
              newProducts.map((product, index) => (
                <Grid item xs={6} sm={6} md={4} lg={4} xl={3} key={index}>
                  <Link
                    to={`/product-detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                      <CardMedia
                        sx={{
                          height: {
                            xs: "100px",
                            sm: "160px",
                            md: "160x",
                            lg: "230px",
                          },
                          objectFit: "cover",
                        }}
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
                          {formatter.format(product.currentPrice)}
                        </MDTypography>
                        <MDBox mb={1}>
                          <TruncatedTypography
                            variant="body"
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
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <MDBox pt={5} lineHeight={1.25}>
        <MDTypography variant="h5" fontWeight="medium">
          Thực phẩm chức năng và mỹ phẩm
        </MDTypography>
        <Divider />
      </MDBox>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {store.getState().productReducer.list.map((product, index) => (
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3} key={index}>
                <Link
                  to={`/product-detail/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                    <CardMedia
                      sx={{
                        height: {
                          xs: "100px",
                          sm: "160px",
                          md: "160x",
                          lg: "230px",
                        },
                        objectFit: "cover",
                      }}
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
                        {formatter.format(product.currentPrice)}
                      </MDTypography>
                      <MDBox mb={1}>
                        <TruncatedTypography
                          variant="body"
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
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <MDBox pt={5} lineHeight={1.25}>
        <MDTypography variant="h5" fontWeight="medium">
          Đỗ Cũ Nhật bãi
        </MDTypography>
        <Divider />
      </MDBox>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {store.getState().productReducer.list.map((product, index) => (
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3} key={index}>
                <Link
                  to={`/product-detail/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                    <CardMedia
                      sx={{
                        height: {
                          xs: "100px",
                          sm: "160px",
                          md: "160x",
                          lg: "230px",
                        },
                        objectFit: "cover",
                      }}
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
                        {formatter.format(product.currentPrice)}
                      </MDTypography>
                      <MDBox mb={1}>
                        <TruncatedTypography
                          variant="body"
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
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
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
