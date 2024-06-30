import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import AdminLayout from "layouts/adminLayout";
import MDButton from "components/shared/MDButton";
import { getCategoryList } from "service/categoryService";
import { createProductAction } from "actions/productActions";
import store from "store";
import { useNavigate } from "react-router-dom";
import configs from "configs";
import { createProduct } from "service/productService";
import MDSnackbar from "components/shared/MDSnackbar";

const NewProductPage = () => {
  const navigator = useNavigate();
  const [errorAlert, setErrorAlert] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: {
      id: "",
      name: "",
    },
    currentPrice: 0,
    oldPrice: 0,
    unit: "",
    description: "",
    subDescription_1: "",
    subDescription_2: "",
    subDescription_3: "",
    remainAmount: 0,
    subContentList: [
      {
        title: "",
        subTitle: "",
        content1: "",
        content2: "",
        content3: "",
        note: "",
        image: {
          imageName: "",
          description: "",
          imageUrl: "",
        },
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setProductDetails({
        ...productDetails,
        [name]: { id: value },
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };

  const handleSubContentChange = (index, e) => {
    const { name, value } = e.target;
    const newSubContentList = [...productDetails.subContentList];

    switch (name) {
      case ("imageName", "imageUrl"):
        newSubContentList[index]["image"][name] = value;
        break;
      case "imageDescription":
        newSubContentList[index]["image"]["description"] = value;
        break;
      default:
        newSubContentList[index][name] = value;
    }

    setProductDetails({
      ...productDetails,
      subContentList: newSubContentList,
    });
  };

  const handleAddSubContent = () => {
    setProductDetails({
      ...productDetails,
      subContentList: [
        ...productDetails.subContentList,
        {
          title: "",
          subTitle: "",
          content1: "",
          content2: "",
          content3: "",
          note: "",
          image: {
            imageName: "",
            description: "",
            imageUrl: "",
          },
        },
      ],
    });
  };

  const handleRemoveSubContent = (index) => {
    const newSubContentList = productDetails.subContentList.filter(
      (_, i) => i !== index
    );
    setProductDetails({
      ...productDetails,
      subContentList: newSubContentList,
    });
  };

  const openErrorAlert = () => setErrorAlert(true);
  const closeErrorAlert = () => setErrorAlert(false);

  const renderErrorAlert = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Lỗi"
      content={`Lỗi khi tạo mới mặt hàng, Vui lòng kiểm tra lại.`}
      open={errorAlert}
      onClose={closeErrorAlert}
      close={closeErrorAlert}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the action to create a new product
    // await store.dispatch(createProductAction(productDetails));
    try {
      const result = await createProduct(productDetails);
      if (result === "error") {
        openErrorAlert();
      } else if (result === "success") {
        navigator(configs.routes.productListMng);
      }
    } catch (error) {
      openErrorAlert();
    }
  };

  useEffect(() => {
    // call category list
    const fetchCategoryList = async () => {
      const categories = await getCategoryList();
      setCategoryList(categories);
    };

    fetchCategoryList();
  }, []);

  return (
    <AdminLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Tạo Sản Phẩm Mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Tên sản phẩm"
                    name="name"
                    value={productDetails.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    sx={{ heigh: "100%" }}
                    label="Danh mục"
                    name="category"
                    value={productDetails.category.id}
                    onChange={handleChange}
                    required
                    select
                    fullWidth
                    InputProps={{
                      sx: {
                        minHeight: "45px", // This ensures the height is similar to other inputs
                      },
                    }}
                  >
                    {categoryList &&
                      categoryList.map((category) => {
                        return (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Giá hiện tại"
                    name="currentPrice"
                    value={productDetails.currentPrice}
                    onChange={handleChange}
                    required
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Giá cũ"
                    name="oldPrice"
                    value={productDetails.oldPrice}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Số lượng còn lại"
                    name="remainAmount"
                    value={productDetails.remainAmount}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Đơn vị"
                    name="unit"
                    value={productDetails.unit}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả"
                    name="description"
                    value={productDetails.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả phụ 1"
                    name="subDescription_1"
                    value={productDetails.subDescription_1}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả phụ 2"
                    name="subDescription_2"
                    value={productDetails.subDescription_2}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả phụ 3"
                    name="subDescription_3"
                    value={productDetails.subDescription_3}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {productDetails.subContentList.map((subContent, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              label="Tiêu đề"
                              name="title"
                              value={subContent.title}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Phụ đề"
                              name="subTitle"
                              value={subContent.subTitle}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Nội dung 1"
                              name="content1"
                              value={subContent.content1}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                              multiline
                              rows={2}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Nội dung 2"
                              name="content2"
                              value={subContent.content2}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                              multiline
                              rows={2}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Nội dung 3"
                              name="content3"
                              value={subContent.content3}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                              multiline
                              rows={2}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Ghi chú"
                              name="note"
                              value={subContent.note}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Tên Ảnh"
                              name="imageName"
                              value={subContent.image.name}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Mô tả ảnh"
                              name="imageDescription"
                              value={subContent.image.description}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Link ảnh"
                              name="imageUrl"
                              value={subContent.image.imageUrl}
                              onChange={(e) => handleSubContentChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          color="secondary"
                          onClick={() => handleRemoveSubContent(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handleAddSubContent}
                    startIcon={<AddIcon />}
                  >
                    Thêm SubContent
                  </MDButton>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <MDButton type="submit" variant="contained" color="success">
                Tạo Sản Phẩm
              </MDButton>
            </CardActions>
          </Card>
          {renderErrorAlert}
        </form>
      </Container>
    </AdminLayout>
  );
};

export default NewProductPage;
