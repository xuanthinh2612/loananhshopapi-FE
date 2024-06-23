import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  TextField,
} from "@mui/material";
import DefaultLayout from "layouts/defaultLayout";
// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDTypography from "components/shared/MDTypography";
import MDInput from "components/shared/MDInput";
import MDButton from "components/shared/MDButton";
import MDSnackbar from "components/shared/MDSnackbar";
import Icon from "@mui/material/Icon";
import DefaultProjectCard from "components/shared/DefaultProductCard";
import { formatter } from "utils/helper";
import MDBoxRoot from "components/shared/MDBox/MDBoxRoot";
import TruncatedTypography from "components/shared/TruncatedTypography";
import MultiLineEllipsis from "components/shared/MultiLineEllipsis";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/shared/MDAvatar";
import SpinnerIcon from "components/SpinnerIcon";

function ProductDetail(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = isAdminUser();

  useEffect(() => {
    store.dispatch(getProductAction(id));
  }, [id]);

  const handleClickBuyNow = (e) => {
    navigate("/order");
  };

  // const renderAuthors = ({ image: media, name }) => (
  //   <Tooltip key={name} title={name} placement="bottom">
  //     <MDAvatar
  //       src={media}
  //       alt={name}
  //       size="xs"
  //       sx={({ borders: { borderWidth }, palette: { white } }) => ({
  //         border: `${borderWidth[2]} solid ${white.main}`,
  //         cursor: "pointer",
  //         position: "relative",
  //         ml: -1.25,

  //         "&:hover, &:focus": {
  //           zIndex: "10",
  //         },
  //       })}
  //     />
  //   </Tooltip>
  // );

  const product = props.product;

  if (props.isLoading) {
    return (
      <DefaultLayout>
        <Container sx={{ textAlign: "center", pt: 1 }}>
          {SpinnerIcon}&nbsp;&nbsp;&nbsp;Đang tải dữ liệu...
        </Container>
      </DefaultLayout>
    );
  }

  if (props.error) {
    return (
      <DefaultLayout>
        <Container sx={{ textAlign: "center", pt: 1 }}>
          <Typography variant="h2">Ôi! Đã có lỗi xảy ra!</Typography>
          <Typography variant="subtitle1">xin vui lòng thử lại sau.</Typography>
        </Container>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {product.id && (
        <>
          <Grid container spacing={4}>
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
                <MDBox mt={3} mb={2}>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    Số Lượng:
                  </Typography>
                  <TextField
                    type="number"
                    defaultValue={1}
                    InputProps={{ inputProps: { min: 1 } }}
                    variant="outlined"
                    size="small"
                    sx={{ width: "100px" }}
                  />
                </MDBox>
                <MDBox
                  mb={1}
                  mt={3}
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDButton
                    fullWidth
                    sx={{ mr: 1 }}
                    variant="gradient"
                    color="success"
                    onClick={(e) => handleClickBuyNow(e)}
                  >
                    &nbsp;Mua Ngay
                  </MDButton>
                  <MDButton
                    variant="gradient"
                    fullWidth
                    sx={{ ml: 1 }}
                    color="warning"
                    // onClick={(e) => handleLoginForm(e)}
                  >
                    Thêm vào giỏ hàng&nbsp;&nbsp;
                    {<Icon>shopping_cart</Icon>}
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
                  <Grid
                    key={index}
                    p={2}
                    mb={0}
                    container
                    justifyContent="center"
                  >
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardMedia
                          sx={{ p: 0, m: 0 }}
                          component="img"
                          image={subContent.image.imageUrl}
                          alt={product.name}
                        />
                      </Card>
                      <CardContent sx={{ textAlign: "center", pt: 1 }}>
                        <Typography variant="caption">
                          {subContent.title}
                        </Typography>
                      </CardContent>
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
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "justify" }}
                          >
                            {subContent.content2}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "justify" }}
                          >
                            {subContent.content3}
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
