import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Divider,
  CardMedia,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useLocation } from "react-router-dom";
import DefaultLayout from "layouts/defaultLayout";
import { formatter } from "utils/helper";
import store from "store";
import MDButton from "components/shared/MDButton";
import MDBox from "components/shared/MDBox";
import ConfirmModal from "components/shared/ConfirmModal";
import MDSnackbar from "components/shared/MDSnackbar";
import MDTypography from "components/shared/MDTypography";
import MDAlert from "components/shared/MDAlert";

function OrderPage() {
  const location = useLocation();
  const product = store.getState().productReducer.item;
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    totalAmount: 0,
  });
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [validatedResult, setValidatedResult] = useState(true);

  const handleOpenModal = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDeleteProduct = (index) => {
    orderDetails.splice(index, 1);
    setOrderDetails(orderDetails);
    setModalOpen(false);
    updateTotalAmount();
  };

  // example product list
  const products = [product, product, product];

  const [orderDetails, setOrderDetails] = useState(
    products.map((product) => {
      return { ...product, quantity: 1 };
    })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    // validate Phone number
    if (name === "phoneNumber") {
      if (value.length > 10) {
        let digits = Array.from(value).filter((char) => /\d/.test(char));
        const newValue = digits.slice(0, 11).join("");
        setErrorSB(true);
        setOrder((prevDetails) => ({
          ...prevDetails,
          [name]: newValue,
        }));
        return;
      } else {
        setErrorSB(false);
      }
    }

    setOrder((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  function validatePhoneNumber(phoneNumber) {
    const regex = /^(03|05|07|08|09)\d{8}$/;
    return regex.test(phoneNumber);
  }

  // function validateEmail(email) {}

  // function validateName(name) {}

  // function validateAddress(address) {}

  const updateTotalAmount = () => {
    const updatedOrder = { ...order };

    const amount = orderDetails.reduce((total, detail) => {
      return total + detail.quantity * detail.currentPrice;
    }, 0);

    updatedOrder.totalAmount = amount;
    setOrder(updatedOrder);
  };

  const handleOrder = () => {
    // check is valid input
    const phoneNumber = order.phoneNumber;
    if (!validatePhoneNumber(phoneNumber)) {
      setValidatedResult(false);
      openErrorSB();

      return;
    }
    setValidatedResult(true);
  };

  useEffect(() => {
    if (!product.id) {
      // Redirect back to product list or handle the case where product details are not available
    }
    updateTotalAmount();
  }, [orderDetails]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedOrderDetails = [...orderDetails];
      updatedOrderDetails[index].quantity = newQuantity;
      setOrderDetails(updatedOrderDetails);
      updateTotalAmount();
    } else {
      handleOpenModal(index);
    }
  };

  const alertContent = (lable) => (
    <MDTypography variant="body2" color="white" container>
      <Grid lg={12}>
        <MDTypography
          component="a"
          href="#"
          variant="body2"
          fontWeight="medium"
          color="white"
        >
          {lable}&nbsp;
        </MDTypography>
        không hợp lệ. Vui lòng kiểm tra lại.
      </Grid>
    </MDTypography>
  );

  return (
    <DefaultLayout>
      <Container>
        {!validatedResult && (
          <MDAlert
            color="error"
            onClick={() => {
              setValidatedResult(true);
            }}
            dismissible
          >
            {alertContent("Thông tin đặt hàng")}
          </MDAlert>
        )}

        <Typography variant="h2" gutterBottom>
          Chi tiết đơn hàng
        </Typography>
        <Divider />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                {orderDetails &&
                  orderDetails.map((orderDetail, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={orderDetail.avatar.imageUrl}
                          alt={orderDetail.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          <Typography variant="h5">
                            {orderDetail.name}
                          </Typography>
                          <Typography variant="h6">
                            {formatter.format(orderDetail.currentPrice)}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {orderDetail.description}
                          </Typography>
                          <Box mt={3}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Số lượng"
                                  name="quantity"
                                  type="number"
                                  fullWidth
                                  value={orderDetail.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      index,
                                      Math.max(0, Number(e.target.value))
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
                                              index,
                                              Math.max(
                                                0,
                                                orderDetail.quantity - 1
                                              )
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
                                            handleQuantityChange(
                                              index,
                                              orderDetail.quantity + 1
                                            )
                                          }
                                        >
                                          <AddIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={2}></Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography color={"red"} variant="h6">
                                  {formatter.format(
                                    orderDetail.currentPrice *
                                      orderDetail.quantity
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </CardContent>
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
              <Divider />
              <CardContent>
                <Box mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <Typography variant="h4" gutterBottom>
                        Tổng giá trị đơn hàng:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="h5" color={"red"}>
                        {formatter.format(order.totalAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}>
                      <MDBox
                        mb={1}
                        display="flex"
                        justifyContent="space-between"
                      >
                        <MDButton
                          fullWidth
                          variant="gradient"
                          color="warning"
                          onClick={handleOrder}
                        >
                          &nbsp;Đặt Hàng
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Thông Tin Người Nhận Hàng
                </Typography>
                <TextField
                  name="name"
                  fullWidth
                  label="Tên khách hàng"
                  variant="outlined"
                  margin="normal"
                  // value={order.name}
                  onChange={handleChange}
                />
                <TextField
                  name="address"
                  fullWidth
                  label="Địa chỉ giao hàng"
                  variant="outlined"
                  margin="normal"
                  // value={order.address}
                  onChange={handleChange}
                />
                <TextField
                  name="phoneNumber"
                  type="number"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  value={order.phoneNumber}
                  sx={{
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }}
                />
                {errorSB && (
                  <Typography color={"red"} variant="subtitle2">
                    Số điện thoại không đúng, vui lòng kiểm tra lại
                  </Typography>
                )}
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
                    color="warning"
                    onClick={handleOrder}
                  >
                    &nbsp;Đặt Hàng
                  </MDButton>
                </MDBox>
              </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h5">Bạn chưa đăng nhập</Typography>

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
                    color="info"
                  >
                    &nbsp;Đăng nhập
                  </MDButton>
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
                  >
                    &nbsp;Đăng ký
                  </MDButton>
                </MDBox>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ConfirmModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleConfirmDeleteProduct(deleteIndex);
        }}
        title="Xác nhận xóa khỏi giỏ hàng"
        message="Bạn có muốn xóa sản phẩm khỏi giỏ hàng?"
      />
    </DefaultLayout>
  );
}

export default OrderPage;
