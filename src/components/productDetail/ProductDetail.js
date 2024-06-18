import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductAction } from "actions/productActions";
import store from "store";
import { isAdminUser } from "service/authService";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import DefaultLayout from "layouts/defaultLayout";
// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDTypography from "components/shared/MDTypography";
import MDInput from "components/shared/MDInput";
import MDButton from "components/shared/MDButton";
import MDSnackbar from "components/shared/MDSnackbar";

function ProductDetail(props) {
  const { id } = useParams();
  const isAdmin = isAdminUser();

  useEffect(() => {
    store.dispatch(getProductAction(id));
  }, [id]);

  if (props.error) {
    return (
      <Container>
        Opp! Some error Occured with status: {props.error.response.status} -{" "}
        {props.error.message}
      </Container>
    );
  }

  if (props.isLoading) {
    return (
      <Container>
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  const product = props.product;

  return (
    <DefaultLayout>
      {product && (
        <>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card p={0} m={0}>
                <CardMedia
                  sx={{ p: 0, m: 0 }}
                  component="img"
                  image={product.avatar.imageUrl}
                  alt={product.name}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h2">{product.name}</Typography>
                <Typography variant="h4">${product.currentPrice}</Typography>
                <Typography variant="subtitle1">
                  Danh Mục: {product.category.name}
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
                <MDBox mt={3} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    // onClick={(e) => handleLoginForm(e)}
                  >
                    &nbsp;Mua Hàng
                  </MDButton>
                </MDBox>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={5}>
            <Grid item xs={12}>
              <Typography variant="h3">Mô tả chi tiết</Typography>
              <Card>
                {product.subContentList.map((subContent, index) => (
                  <Grid key={index} p={2} mb={5} container>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardMedia
                          sx={{ p: 0, m: 0 }}
                          component="img"
                          image={subContent.image.imageUrl}
                          alt={product.name}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" alignItems="center" height="100%">
                        <CardContent>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "justify" }}
                          >
                            {subContent.content1}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
      {/* <Grid container spacing={4} mt={5}>
        <Grid item xs={12}>
          <Typography variant="h3">Similar Products</Typography>
          <Grid container spacing={2}>
            {console.log(store.getState())}
            {store
              .getState()
              .productReducer.list.map((similarProduct, index) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                  <Link
                    to={`/product/${similarProduct.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        image={similarProduct.avatar.imageUrl}
                        alt={similarProduct.name}
                      />
                      <CardContent>
                        <Typography variant="body1">
                          {similarProduct.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid> */}
    </DefaultLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.item,
    isLoading: state.productReducer.isLoading,
    error: state.productReducer.error,
  };
};

export default connect(mapStateToProps)(ProductDetail);
