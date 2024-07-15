import React, { useEffect, useState } from "react";
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
  Divider,
  InputAdornment,
  IconButton,
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

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  useMaterialUIController,
  changeCartItem,
  changeNotificationItem,
} from "context";
import configs from "configs";

function ProductDetail(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { NotificationItem, shoppingCartItems } = controller;
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [successSB, setSuccessSB] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = isAdminUser();

  useEffect(() => {
    store.dispatch(getProductAction(id));
  }, [id]);

  const product = props.product;

  const handleClickBuyNow = (e) => {
    handleClickAddToCart();
    navigate(configs.routes.orders);
  };

  const handleClickAddToCart = () => {
    for (var i = 0; i < shoppingCartItems.length; i++) {
      if (shoppingCartItems[i].id === product.id) {
        shoppingCartItems[i].quantity += orderQuantity;
        openSuccessSB();
        return;
      }
    }

    changeCartItem(dispatch, [
      ...shoppingCartItems,
      { ...product, quantity: orderQuantity },
    ]);
    openSuccessSB();
  };

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Thêm vào giỏ hàng"
      content={`Bạn đã thêm ${product.name} vào giỏ hàng.`}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const handleQuantityChange = (newQuantity) => {
    setOrderQuantity(newQuantity);
  };

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
      <Container>
        {product.id && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <Card p={0} m={0}>
                  <CardMedia
                    sx={{ p: 0, m: 0 }}
                    component="img"
                    image={product.avatar.imageUrl}
                    alt={product.name}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="text" color={"primary"}>
                    {formatter.format(product.currentPrice)}
                  </Typography>
                  <Typography variant="subtitle1">
                    Danh Mục: {product.category.name}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <MDBox mt={3} mb={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <TextField
                          label="Số lượng"
                          name="quantity"
                          type="number"
                          fullWidth
                          value={orderQuantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          InputProps={{
                            inputProps: { min: 1 },
                            sx: {
                              "& input[type=number]": {
                                "-moz-appearance": "textfield",
                              },
                              "& input[type=number]::-webkit-outer-spin-button":
                                {
                                  "-webkit-appearance": "none",
                                  margin: 0,
                                },
                              "& input[type=number]::-webkit-inner-spin-button":
                                {
                                  "-webkit-appearance": "none",
                                  margin: 0,
                                },
                            },

                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleQuantityChange(
                                      Math.max(1, orderQuantity - 1)
                                    )
                                  }
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleQuantityChange(orderQuantity + 1)
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={8}></Grid>
                    </Grid>
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
                      Mua Ngay&nbsp;&nbsp; {<Icon>local_mall</Icon>}
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      fullWidth
                      sx={{ ml: 1 }}
                      color="warning"
                      onClick={handleClickAddToCart}
                    >
                      Thêm vào giỏ hàng&nbsp;&nbsp; {<Icon>shopping_cart</Icon>}
                    </MDButton>
                  </MDBox>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={5}>
              <Grid item xs={12}>
                <Typography variant="h3">Chi tiết mặt hàng</Typography>
                <Divider />

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
                        {subContent.image.imageUrl && (
                          <>
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
                          </>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" height="100%">
                          <CardContent>
                            <Typography
                              variant="body2"
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
            <Divider />

            <Typography variant="h3" mb={3}>
              Sản phẩm tương tự
            </Typography>
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {renderSuccessSB}
      </Container>
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
