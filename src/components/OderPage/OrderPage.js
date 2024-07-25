import React, { useState, useEffect, useMemo } from "react";
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

import { Link, useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "layouts/defaultLayout";
import { formatter } from "utils/helper";
import store from "store";
import MDButton from "components/shared/MDButton";
import MDBox from "components/shared/MDBox";
import ConfirmModal from "components/shared/ConfirmModal";
import MDSnackbar from "components/shared/MDSnackbar";
import MDTypography from "components/shared/MDTypography";
import MDAlert from "components/shared/MDAlert";
import { useMaterialUIController } from "context";
import { isUserLoggedIn } from "service/authService";
import { changeCartItem } from "context";
import { createOrder } from "service/orderService";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import configs from "configs";

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [validatedResult, setValidatedResult] = useState(true);
  const [controller, dispatch] = useMaterialUIController();
  const { shoppingCartItems } = controller;
  const [orderDetails, setOrderDetails] = useState(shoppingCartItems);
  const [error, setError] = useState(false);

  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    totalAmount: 0,
    productIds: [], // {productId: xx, number: xx}
  });

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
    changeCartItem(dispatch, orderDetails);
  };

  const handleChangeOrderInfo = (e) => {
    const { name, value } = e.target;
    setAddressError(false);
    setNameError(false);
    setPhoneNumberError(false);
    setValidatedResult(true);

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function isValidhoneNumber(phoneNumber) {
    const regex = /^(03|05|07|08|09)\d{8}$/;
    return regex.test(phoneNumber);
  }

  function isValidName(name) {
    const namePatern = /[0-9!@#$%^&*(),.?":{}|<>/\\]/;

    if (name.length > 0) {
      return !namePatern.test(name);
    } else {
      return false;
    }
  }

  function isValidAddress(address) {
    const addressPatern = /[!@#$%^&*()?":{}|<>]/;

    if (address.length > 0) {
      return !addressPatern.test(address);
    } else {
      return false;
    }
  }

  const updateTotalAmount = () => {
    const updatedOrder = { ...order };

    const amount = orderDetails.reduce((total, detail) => {
      return total + detail.quantity * detail.currentPrice;
    }, 0);

    updatedOrder.totalAmount = amount;
    setOrder(updatedOrder);
  };

  const handleSubmitOrder = async () => {
    // check is valid input
    const phoneNumber = order.phoneNumber;
    let hasError = false;
    if (!isValidhoneNumber(phoneNumber)) {
      setPhoneNumberError(true);
      hasError = true;
    }

    if (!isValidName(order.name)) {
      hasError = true;
      setNameError(true);
    }

    if (!isValidAddress(order.address)) {
      hasError = true;
      setAddressError(true);
    }

    if (hasError) {
      setValidatedResult(false);
    } else {
      setValidatedResult(true);

      // call api create order
      const res = await createOrder(order);

      if (res === "success") {
        // reset cart items
        changeCartItem(dispatch, []);
        handleOpen();
      } else {
        openError();
      }
    }
  };

  const updateOrderBeforeSubmit = () => {
    const updatedOrderProduct = orderDetails.map((item) => {
      return { productId: item.id, quantity: item.quantity };
    });

    const newOrder = {
      ...order,
      productIds: updatedOrderProduct,
    };

    setOrder(newOrder);
  };

  useEffect(() => {
    updateTotalAmount();
  }, [orderDetails]);

  useMemo(() => {
    // update cart and order before submit
    updateOrderBeforeSubmit();
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

  const openError = () => setError(true);
  const closeError = () => setError(false);

  const renderError = (
    <MDSnackbar
      color="error"
      icon="check"
      title="Lỗi!"
      content={`Đã có lỗi xảy ra, vui lòng thực hiện lại.`}
      open={error}
      onClose={closeError}
      close={closeError}
      bgWhite
    />
  );

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(configs.routes.home);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function PopupAlert() {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Alert severity="success">
              <AlertTitle>Đặt hàng thành công!</AlertTitle>
              Chúng tôi sẽ xử lý đơn hàng sớm nhất.
              <br />
              Cám ơn bạn đã tin tưởng sản phẩm do Loan Anh Shop phân phối!
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  if (orderDetails.length <= 0) {
    return (
      <DefaultLayout>
        <Container>
          <Typography variant="h5" gutterBottom>
            Bạn không có sản phẩm nào trong giỏ hàng!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Vui lòng quay lại trang chủ&nbsp;
            <Link
              to={configs.routes.home}
              style={{ textDecoration: "none" }}
              color="text"
            >
              loananhshop.com
            </Link>
          </Typography>
          <Divider />
        </Container>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Container>
        {PopupAlert()}
        {renderError}
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
                {!orderDetails.length > 0 && <MDBox></MDBox>}

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
                          onClick={handleSubmitOrder}
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
                  value={order.name}
                  onChange={handleChangeOrderInfo}
                />
                {nameError && (
                  <Typography color={"red"} variant="subtitle2">
                    Tên không hợp lệ
                  </Typography>
                )}

                <TextField
                  name="address"
                  fullWidth
                  label="Địa chỉ giao hàng"
                  variant="outlined"
                  margin="normal"
                  value={order.address}
                  onChange={handleChangeOrderInfo}
                />
                {addressError && (
                  <Typography color={"red"} variant="subtitle2">
                    Địa chỉ không hợp lệ
                  </Typography>
                )}

                <TextField
                  name="phoneNumber"
                  type="number"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChangeOrderInfo}
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
                {phoneNumberError && (
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
                    onClick={handleSubmitOrder}
                  >
                    &nbsp;Đặt Hàng
                  </MDButton>
                </MDBox>
              </CardContent>
            </Card>
            {!isUserLoggedIn && (
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
            )}
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
